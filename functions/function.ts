import {Handler} from 'aws-lambda';

export const handler: Handler = async (event, context) => {
    return {
        statusCode: 200,
        body: "HELLO-TYPESCRIPT!"
    }
  };
