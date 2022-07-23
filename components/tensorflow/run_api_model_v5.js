const {calculate_mape_between_historical_and_forecast_price} = require("./toolsets/forecast_probability_util");
const {calculate_mse_between_historical_and_forecast_price} = require("./toolsets/mse_util");

const {loadLayersModel} = require("@tensorflow/tfjs-node");
const {forecast, get_stock_data, predict} = require("./toolsets/core_ai_v5.js");


async function run_api_model(stock_data, _tf_model_dir) {
    /**
     * stock_data -> the stock data object in list format
     * model dir -> the url coming from microsoft azure or local storage
     **/

    /*** variables ***/
    const no_of_trading_days_in_a_year = 260; // no of trading days in a year
    const no_of_trading_days_in_a_year_multiplier = 2; // no of years / batches to cover
    const days_range = 5; // the number of days range to compute in
    const _display_in_epoch_time = true;


    /*** program logic ***/
    let stock_dataset = get_stock_data(
        stock_data,
        no_of_trading_days_in_a_year,
        days_range,
        no_of_trading_days_in_a_year_multiplier
    );

    /*** run model ***/
        // 2. load the neural network model
    const sample_model = loadLayersModel(_tf_model_dir);

    // 3. train the model
    const predict_result = sample_model
        .then((_model) => {
            try {
                console.log("successfully loaded model");
                console.log(_model.summary());
                return _model;
            } catch (e) {
                console.log("unable to load model");
                console.log(e);
            }
        })
        .then(async (_model) => {
            // validation dataset results
            console.log("perform prediction");
            const validation_data_result = await predict(
                _model,
                stock_dataset.validation.tensor_xs_list,
                stock_dataset.validation.raw_ys_list
            );
            // testing dataset results
            console.log("perform forecasting");
            const result = await forecast(
                30,
                _model,
                stock_dataset.testing.raw_xs_list,
                stock_dataset.testing.raw_ys_list
            );
            // array format
            let day1 = result.output_ys_list[0]; // day 1
            let day7 = result.output_ys_list[6]; // day 7
            let day30 = result.output_ys_list[29]; // day 30
            function _convert_array_to_obj(_day_array) {
                const _obj = {
                    "epoch_time": '',
                    "price": 0,
                    "confidence_score": 0,
                    "rate_of_error": 0,
                };

                let epoch_time;
                if (_display_in_epoch_time) {
                    epoch_time = _day_array[1].getTime().toString();
                } else {
                    epoch_time = _day_array[1].toISOString();
                }

                _obj['epoch_time'] = epoch_time;
                _obj['price'] = _day_array[0];
                return _obj;
            }

            const historical_list = stock_dataset.validation.raw_ys_list;
            const predict_list = validation_data_result;

            // obj format
            day1 = _convert_array_to_obj(day1);
            day7 = _convert_array_to_obj(day7);
            day30 = _convert_array_to_obj(day30);

            return {
                "historical_list": historical_list,
                "predict_list": predict_list,
                // (still need to update confidence score because it is 0)
                "forecast_list": [day1, day7, day30], // 3 days prediction
            }
        }).then(_result_entity => {
            const historical_list = _result_entity.historical_list;
            const predicted_list = _result_entity.predict_list;
            const forecast_list = _result_entity.forecast_list;
            // 4. get the mape score against the testing dataset
            // get the confidence score
            const mape_entity = calculate_mape_between_historical_and_forecast_price(
                historical_list,
                predicted_list,
                forecast_list
            );

            // update confidence score
            const day1 = forecast_list[0];
            day1.confidence_score = mape_entity.mape_1;
            const day7 = forecast_list[1];
            day7.confidence_score = mape_entity.mape_7;
            const day30 = forecast_list[2];
            day30.confidence_score = mape_entity.mape_30;

            return {
                "historical_list": historical_list,
                "predict_list": predicted_list,
                // (still need to update loss function because it is 0)
                "forecast_list": forecast_list, // 3 days prediction
            }
        }).then(_result_entity => {
            const historical_list = _result_entity.historical_list;
            const predicted_list = _result_entity.predict_list;
            const forecast_list = _result_entity.forecast_list;
            // 4. get the mape score against the testing dataset
            // get the confidence score
            const mse_entity = calculate_mse_between_historical_and_forecast_price(
                historical_list,
                predicted_list,
                forecast_list
            );

            // update confidence score
            const day1 = forecast_list[0];
            day1.rate_of_error = mse_entity.mse_1;
            const day7 = forecast_list[1];
            day7.rate_of_error = mse_entity.mse_7;
            const day30 = forecast_list[2];
            day30.rate_of_error = mse_entity.mse_30;

            return forecast_list;
        });

    return predict_result;
}

module.exports = {
    run_api_model
};