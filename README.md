## Algotuno Tensorflow.js backend V3
This is the tensorflow backend api sample project.

## Node Version to run
1. It is recommended to run this app with the node.js version 14
2. the version that should be used is `14.7.3`
3. if you need to use different versions of node.js, use NVM(node version manager)

#### How to start project
1. run `npm install` in the command line on the root directory
2. run `npm start` or `npm dev` in the command line on the root directory

> Note: npm start runs production build.

## How to setup environment variables in the project

#### In microsoft azure
1. Store the secret key in this configuration page in microsoft azure.
<img width="839" alt="Screenshot 2022-06-07 at 11 18 20 PM" src="https://user-images.githubusercontent.com/22993048/177581978-832a738d-8880-4d18-956c-adccbf182522.png">

#### In local machine
2. Store the secret key in the .env file
- take the .env.example
- make a copy of it
- add the secret key in this file, the values placed in the environment file will be used across the entire app
- DO NOT COMMIT THE .env file !!

## AVAILABLE API ENDPOINTS
1. RUN AN EXISTING MACHINE LEARNING MODEL (POST REQUEST)
2. GET ALL THE BLOB STORAGE FILES (GET REQUEST)


## Usage

#### RUN AN EXISTING MACHINE LEARNING MODEL (POST REQUEST)
To run a forecast on a specific stock, send a POST request to the **/tfjs_run_model/** endpoint with the body contents as such:
NOTE: the `stock_metadata_list` should be prefilled with the stock data coming from the **/api/stock/get_hsp** api

**AVAILABLE URL ENDPOINTS TO HIT**
> LOCALHOST: localhost:3000/tfjs_run_model/
> INTERNET: algotunotfjsv3.azurewebsites.net/tfjs_run_model/


Input Example: 

```
{
    "ticker_symbol" : "AAPL",
    "stock_metadata_list" : []
}
```

Output Example:
```
{
    "message": "SUCCESS",
    "result": {
        "ticker_symbol": "AAPL",
        "model_type": 1,
        "prediction": [
            {
                "1640995200000": 176.67007446289062
            },
            {
                "1641513600000": 173.08694458007812
            },
            {
                "1643500800000": 165.156982421875
            }
        ]
    }
}
```

Example with POSTMAN:

<img width="839" alt="Screenshot 2022-06-07 at 11 18 20 PM" src="https://user-images.githubusercontent.com/22993048/177574094-55cdf8e8-0faf-48aa-82fa-b36beab817c9.png">


#### GET ALL THE BLOB STORAGE FILES (GET REQUEST)
To get the list of stocks available in the blob storage, this api can retrieve it.
NOTE: by passing one additional parameter **http://localhost:3000/azure_mgt/list_all_blobs?get_companies_by_file_name=true**
you will be able to get the files group by company name. this would be the most ideal way to call this api

**AVAILABLE URL ENDPOINTS TO HIT**
> LOCALHOST: http://localhost:3000/azure_mgt/list_all_blobs?get_companies_by_file_name=true
> INTERNET: algotunotfjsv3.azurewebsites.net/azure_mgt/list_all_blobs?get_companies_by_file_name=true


Input Example: 

```
{
    "ticker_symbol" : "AAPL",
    "stock_metadata_list" : []
}
```

Output Example:
```
{
    "file_list": [
        "aapl",
        "amcr",
        "amzn",
        "test",
        "tsla"
    ],
    "get_companies_by_file_name": true
}
```

Example with POSTMAN:

<img width="839" alt="Screenshot 2022-06-07 at 11 18 20 PM" src="https://user-images.githubusercontent.com/22993048/177574463-d22499dc-2b2b-497c-a342-2bf662730ae9.png">
