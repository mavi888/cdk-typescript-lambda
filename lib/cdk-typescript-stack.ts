import { Construct } from 'constructs';
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';

import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import {Runtime, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs"
import * as path from 'path';

export class CdkTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Dynamodb table definition
    const table = new Table(this, "Hello", {
      partitionKey: { name: "name", type: AttributeType.STRING },
    });

    // lambda function
    const dynamoLambda = new NodejsFunction(this, "DynamoLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, `/../functions/function.ts`),
      handler: "handler",
      environment: {
        HELLO_TABLE_NAME: table.tableName,
      },
    });

    // permissions to lambda to dynamo table
    table.grantReadWriteData(dynamoLambda);

    const myFunctionUrl = dynamoLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      }
    });

    new CfnOutput(this, 'FunctionUrl', {
      value: myFunctionUrl.url,
    });

  }
}
