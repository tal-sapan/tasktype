# tasktype README

This extensions defines a custom task provider with task type `hello-task`. When executing the task, it runs a shell command that echoes the text "Hello User!". After a task (any task) ends it shows an information message with the fields `type` and `taskType` from the task definition.