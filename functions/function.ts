import { Handler } from 'aws-lambda';

import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME : string = process.env.HELLO_TABLE_NAME!;

export const handler: Handler = async (event, context) => {

    const method = event.requestContext.http.method;

    if (method === 'GET') {
        return await getHello(event)
     } else if (method === 'POST') {
        return await save(event);
     } else {
         return {
             statusCode: 400, 
             body: 'Not a valid operation'
         };
     }  
};

async function save(event : any) {
    const name = event.queryStringParameters.name;
  
    const item = {
      name: name,
      date: Date.now(),
    };
  
    console.log(item);
    const savedItem = await saveItem(item);
  
    return {
      statusCode: 200,
      body: JSON.stringify(savedItem),
    };
  };
  
async function getHello(event : any ) {
    const name = event.queryStringParameters.name;

    const item = await getItem(name);
  
    if (item !== undefined && item.date) {
      const d = new Date(item.date);

      const message = `Was greeted on ${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()}`;

      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
      
    } else {
 
      const message = "Nobody was greeted with that name";
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    }
  };
  
async function getItem(name : string ) {

    const params : DynamoDB.DocumentClient.GetItemInput = {
        Key: {
        name: name,
      },
      TableName: TABLE_NAME,
    };
    
    return dynamo
      .get(params)
      .promise()
      .then((result) => {
        console.log(result);
        return result.Item;
      });
}
  
async function saveItem(item : any) {

    const params : DynamoDB.DocumentClient.PutItemInput = {
      TableName: TABLE_NAME,
      Item: item,
    };
  
    return dynamo
      .put(params)
      .promise()
      .then(() => {
        return item;
      });
}