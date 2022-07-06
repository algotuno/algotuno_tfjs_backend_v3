var express = require('express');
var router = express.Router();

require('dotenv').config();
const {NEXT_PUBLIC_AZURE_BLOB_STORAGE_TF_MODELS, MODEL_TYPE, CONTAINER_NAME} = require("../components/constants.js");
const {BlobServiceClient} = require('@azure/storage-blob');
// Connect to Microsoft Azure
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURESTORAGECONNECTIONSTRING);
// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

/* GET tfjs api */
router.get('/', function (req, res, next) {
    res.send({message: 'Welcome to the azure api!'});
});


/* GET list of all the blobs in the tensorflow container */
router.get("/list_all_blobs", async function (req, res, next) {
    function get_item_from_javascript_obj(company_name, company_list) {
        if (!(company_name in company_list)) {
            company_list[company_name] = {};
        }
        return company_list[company_name];
    }

    const group_by_company_name = (_list) => {
        const company_list = {};
        if (_list.length === 0) {
            return company_list;
        } else {
            _list.forEach(file_name => {
                const company_name = file_name.split("/")[0];
                const company_entity = get_item_from_javascript_obj(company_name, company_list);

                if (file_name.includes('model.json')) {
                    company_entity.model = file_name;
                } else if (file_name.includes('weights.bin')) {
                    company_entity.weights = file_name;
                }
                // update company list
                company_list[company_name] = company_entity;

            });
            return company_list;
        }
    }

    async function get_list_of_companies_from_azure() {
        const list_of_files = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            list_of_files.push(blob.name);
        }
        return list_of_files;
    }

    // 1. get the query param
    const {get_companies_by_file_name} = req.query;
    // 2. get the list of companies from azure blob storage
    const list_of_files = await get_list_of_companies_from_azure();
    // 3. group by company name
    const group_files_by_company_name = group_by_company_name(list_of_files);
    // 4. get list of company names only
    const outcome_for_get_companies_by_file_name = get_companies_by_file_name !== undefined
        && get_companies_by_file_name.toString() === 'true';
    const list_of_companies = outcome_for_get_companies_by_file_name ?
        Object.keys(group_files_by_company_name) : group_files_by_company_name;

    res.send({file_list: list_of_companies, get_companies_by_file_name: outcome_for_get_companies_by_file_name});
});

router.post('/delete_blob', function (req, res) {
    async function deleteBlobIfItExists(containerClient, blobName) {

        // include: Delete the base blob and all of its snapshots.
        // only: Delete only the blob's snapshots and not the blob itself.
        const options = {
            deleteSnapshots: 'include' // or 'only'
        }

        // Create blob client from container client
        const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.deleteIfExists(options);

        console.log(`deleted blob ${blobName}`);

    }

    res.json({requestBody: req.body});
});


module.exports = router;