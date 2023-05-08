require "graphql/rake_task"

GraphQL::RakeTask.new(
  schema_name: "BiancoSchema",
  directory: "./app/javascript/gql",
  dependencies: [:environment]
)