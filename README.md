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

<img width="839" alt="get_tensorflow_api" src="https://user-images.githubusercontent.com/22993048/177574094-55cdf8e8-0faf-48aa-82fa-b36beab817c9.png">


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

<img width="839" alt="get_all_files_list_api" src="https://user-images.githubusercontent.com/22993048/177574463-d22499dc-2b2b-497c-a342-2bf662730ae9.png">


#### DELETE BLOB STORAGE (POST REQUEST)
This API will help in deleting a blob storage.

**AVAILABLE URL ENDPOINTS TO HIT**
> LOCALHOST: http://localhost:3000/azure_mgt/delete_blob
> INTERNET: algotunotfjsv3.azurewebsites.net/azure_mgt/delete_blob


Input Example: 

```
{
    "blob_name" : "test/1.jpeg"
}
```

Output Example:
```
{
    "did_succeed": true,
    "error_code": "",
    "blob_name": "test/1.jpeg"
}
```

Example with POSTMAN:

<img width="839" alt="delete_file_api" src="https://user-images.githubusercontent.com/22993048/178092588-033c85e2-c0a1-4cdd-9a48-ac210901f05b.png">


#### UPLOAD FILES INTO BLOB STORAGE (POST REQUEST)
This API will help in allowing files to be uploaded into a blob storage.
there is an additional parameter to pass in the URL and that is the name of the stock name.
NOTE: there is no validation check to check if there is an existing file in the folder, if the file with the same
file name is uploaded, then the existing file will be overridden.

**AVAILABLE URL ENDPOINTS TO HIT**
> LOCALHOST: http://localhost:3000/azure_mgt/upload_blob/REPLACE_STOCK_NAME_HERE
> INTERNET: algotunotfjsv3.azurewebsites.net/azure_mgt/upload_blob/REPLACE_STOCK_NAME_HERE


Input Example: 

```
# unable to display since the input data is a form-data
```

Output Example:
```
{
    "message": "File upload is successful !!"
}
```

Example with POSTMAN:

<img width="839" alt="upload_file_api" src="https://user-images.githubusercontent.com/22993048/178094613-eb406c52-0fad-469e-be37-0c75fe0a857b.png">