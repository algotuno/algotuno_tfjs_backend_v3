## Algotuno Tensorflow.js backend V3
This is the tensorflow backend api sample project.

#### How to start project
1. run `npm install` in the command line on the root directory
2. run `npm start` or `npm dev` in the command line on the root directory

> Note: npm start runs production build.

## Overview
Added the following scripts:
- run_model.ts


#### Usage
## run_model.ts
To run a forecast on a specific stock, send a POST request to the **/tfjs_run_model/** endpoint with the body contents as such:
NOTE: the `stock_metadata_list` should be prefilled with the stock data coming from the **/api/stock/get_hsp** api

**URL ENDPOINTS TO HIT**
> LOCALHOST: localhost:3000/tfjs_run_model/

> INTERNET: algotunotfjsv3.azurewebsites.net/tfjs_run_model/


Input Example: 

```
{
    "ticker_symbol" : "APPL",
    "stock_metadata_list" : []
}
```

Output Example:
```
{
    "message": "SUCCESS",
    "result": {
        "ticker_symbol": "APPL",
        "model_type": 1,
        "prediction": [
            {
                "Sat Jan 01 2022 08:00:00 GMT+0800 (Singapore Standard Time)": 177.87269592285156
            },
            {
                "Fri Jan 07 2022 08:00:00 GMT+0800 (Singapore Standard Time)": 178.38754272460938
            },
            {
                "Sun Jan 30 2022 08:00:00 GMT+0800 (Singapore Standard Time)": 178.56460571289062
            }
        ]
    }
}
```

Example with POSTMAN:
<img width="839" alt="Screenshot 2022-06-07 at 11 18 20 PM" src="https://user-images.githubusercontent.com/22993048/172420069-23042252-940e-491b-9a41-49ebe60b17ac.png">
