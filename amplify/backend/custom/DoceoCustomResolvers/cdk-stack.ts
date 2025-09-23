import * as cdk from 'aws-cdk-lib';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { Construct } from 'constructs';
//import * as iam from 'aws-cdk-lib/aws-iam';
//import * as sns from 'aws-cdk-lib/aws-sns';
//import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
//import * as sqs from 'aws-cdk-lib/aws-sqs';

export class cdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */

    // Example 1: Set up an SQS queue with an SNS topic 

    /*
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const sqsQueueResourceNamePrefix = `sqs-queue-${amplifyProjectInfo.projectName}`;
    const queue = new sqs.Queue(this, 'sqs-queue', {
      queueName: `${sqsQueueResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇create sns topic
    
    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}`;
    const topic = new sns.Topic(this, 'sns-topic', {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn,
      description: 'The arn of the SNS topic',
    });
    */

    // Example 2: Adding IAM role to the custom stack 
    /*
    const roleResourceNamePrefix = `CustomRole-${amplifyProjectInfo.projectName}`;
    
    const role = new iam.Role(this, 'CustomRole', {
      assumedBy: new iam.AccountRootPrincipal(),
      roleName: `${roleResourceNamePrefix}-${cdk.Fn.ref('env')}`
    }); 
    */

    // Example 3: Adding policy to the IAM role
    /*
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['*'],
        resources: [topic.topicArn],
      }),
    );
    */

    // Access other Amplify Resources 
    const retVal: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [
        { category: 'api', resourceName: 'doceonew' },
      ]
    );

    const requestVTL = `
      ## [Start] Initialization default values. **
      $util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
      #set( $createdAt = $util.time.nowISO8601() )
      #set($tagsArray = [])
      #foreach($item in \${ctx.args.tags})
        $util.qr($item.put("id", $util.defaultIfNullOrBlank($item.id, $util.autoId())))
        $util.qr($item.put("createdAt", $util.defaultIfNull($item.createdAt, $createdAt)))
        $util.qr($item.put("updatedAt", $util.defaultIfNull($item.updatedAt, $createdAt)))
        $util.qr($item.put("__typename", "UserTag"))
        $util.qr($tagsArray.add($util.dynamodb.toMapValues($item)))
      #end
      ## [End] Initialization default values. **
      $util.toJson( {
        "version": "2018-05-29",
        "operation": "BatchPutItem",
        "tables": {
          "UserTag-${cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput)}-${cdk.Fn.ref('env')}": $tagsArray
        }
      } )
    `
    const responseVTL = `
      ## [Start] ResponseTemplate. **
      #if( $ctx.error )
        $util.error($ctx.error.message, $ctx.error.type)
      #else
        $util.toJson($ctx.result.data.UserTag-${cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput)}-${cdk.Fn.ref('env')})
      #end
      ## [End] ResponseTemplate. **
    `;

    const resolver = new cdk.aws_appsync.CfnResolver(this, "custom-resolver", {
      // apiId: retVal.api.new.GraphQLAPIIdOutput,
      // https://github.com/aws-amplify/amplify-cli/issues/9391#event-5843293887
      // If you use Amplify you can access the parameter via Ref since it's a CDK parameter passed from the root stack.
      // Previously the ApiId is the variable Name which is wrong , it should be variable value as below
      apiId: cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput),
      fieldName: "batchCreateUserTag",
      typeName: "Mutation", // Query | Mutation | Subscription
      requestMappingTemplate: requestVTL,
      responseMappingTemplate: responseVTL,
      dataSourceName: "UserTagTable" // DataSource name
    })

    const deleteRequestVTL = `
      ## [Start] Initialization default values. **
      $util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
      #set($tagsToDelete = [])
      #foreach($id in \${ctx.args.deleteIds})
        #set($map = {})
        $util.qr($map.put("id", $util.dynamodb.toString($id)))
        $util.qr($tagsToDelete.add($map))
      #end
      $util.toJson( {
        "version": "2018-05-29",
        "operation": "BatchDeleteItem",
        "tables": {
          "UserTag-${cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput)}-${cdk.Fn.ref('env')}": $tagsToDelete
        }
      } )
    `
    const deleteResponseVTL = `
      ## [Start] ResponseTemplate. **
      #if( $ctx.error )
        $util.error($ctx.error.message, $ctx.error.type)
      #else
        $util.toJson($ctx.result.data.UserTag-${cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput)}-${cdk.Fn.ref('env')})
      #end
      ## [End] ResponseTemplate. **
    `;

    const deleteResolver = new cdk.aws_appsync.CfnResolver(this, "custom-delete-resolver", {
      // apiId: retVal.api.new.GraphQLAPIIdOutput,
      // https://github.com/aws-amplify/amplify-cli/issues/9391#event-5843293887
      // If you use Amplify you can access the parameter via Ref since it's a CDK parameter passed from the root stack.
      // Previously the ApiId is the variable Name which is wrong , it should be variable value as below
      apiId: cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput),
      fieldName: "batchDeleteUserTag",
      typeName: "Mutation", // Query | Mutation | Subscription
      requestMappingTemplate: deleteRequestVTL,
      responseMappingTemplate: deleteResponseVTL,
      dataSourceName: "UserTagTable" // DataSource name
    })

    const requestUpdateOrderVTL = `
      ## [Start] Initialization default values. **
      $util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
      #set( $createdAt = $util.time.nowISO8601() )
      #set($categoriesArray = [])
      #foreach($item in \${ctx.args.categories})
        $util.qr($item.put("id", $util.defaultIfNullOrBlank($item.id, $util.autoId())))
        $util.qr($item.put("createdAt", $util.defaultIfNull($item.createdAt, $createdAt)))
        $util.qr($item.put("updatedAt", $util.defaultIfNull($item.updatedAt, $createdAt)))
        $util.qr($item.put("order", $item.order))
        $util.qr($item.put("image", $item.image))
        $util.qr($item.put("description", $item.description))
        $util.qr($item.put("name", $item.name))
        $util.qr($item.put("__typename", "Category"))
        $util.qr($categoriesArray.add($util.dynamodb.toMapValues($item)))
      #end
      ## [End] Initialization default values. **
      $util.toJson( {
        "version": "2018-05-29",
        "operation": "BatchPutItem",
        "tables": {
          "Category-${cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput)}-${cdk.Fn.ref('env')}": $categoriesArray
        }
      } )
    `
    const responseUpdateOrderVTL = `
      ## [Start] ResponseTemplate. **
      #if( $ctx.error )
        $util.error($ctx.error.message, $ctx.error.type)
      #else
        $util.toJson($ctx.result.data.Category-${cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput)}-${cdk.Fn.ref('env')})
      #end
      ## [End] ResponseTemplate. **
    `;

    const updateOrderResolver = new cdk.aws_appsync.CfnResolver(this, "custom-updateOrder-resolver", {
      // apiId: retVal.api.new.GraphQLAPIIdOutput,
      // https://github.com/aws-amplify/amplify-cli/issues/9391#event-5843293887
      // If you use Amplify you can access the parameter via Ref since it's a CDK parameter passed from the root stack.
      // Previously the ApiId is the variable Name which is wrong , it should be variable value as below
      apiId: cdk.Fn.ref(retVal.api.doceonew.GraphQLAPIIdOutput),
      fieldName: "updateCategoryOrder",
      typeName: "Mutation", // Query | Mutation | Subscription
      requestMappingTemplate: requestUpdateOrderVTL,
      responseMappingTemplate: responseUpdateOrderVTL,
      dataSourceName: "CategoryTable" // DataSource name
    })
  }
}