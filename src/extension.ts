import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Register the task provider
	const taskProvider = new HelloTaskProvider();
	context.subscriptions.push(
		vscode.tasks.registerTaskProvider(
			HelloTaskProvider.taskType,
			taskProvider
		)
	);

	// Show task type when it ends
	vscode.tasks.onDidEndTask((e) => {
		const taskDefinition = e.execution.task.definition;
		vscode.window.showInformationMessage(`Task ended. definition.type: ${taskDefinition.type}, definition.taskType: ${taskDefinition.taskType}`);
	}, undefined, context.subscriptions);

	// Add command that runs a task
	context.subscriptions.push(
		vscode.commands.registerCommand("tasktype.RunHelloTask", async () => {
			const execution = await vscode.tasks.executeTask(createTask());
			const taskDefinition = execution.task.definition;
			vscode.window.showInformationMessage(`Task executed. definition.type: ${taskDefinition.type}, definition.taskType: ${taskDefinition.taskType}`);
		}, undefined)
	)
	createTask().d
}

// this method is called when your extension is deactivated
export function deactivate() { }

function createTask(): vscode.Task {
	const taskDefinition = {
		type: HelloTaskProvider.taskType
	};
	return new vscode.Task(
		taskDefinition,
		vscode.workspace.workspaceFolders![0],
		"Hello User",
		"tasktype extension",
		new vscode.ShellExecution(`echo "Hello User!"`)
	);
}

class HelloTaskProvider implements vscode.TaskProvider {
	public static readonly taskType = "hello-task";
	provideTasks(token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
		const tasks: vscode.Task[] = [];
		tasks.push(createTask());
		return tasks;
	}
	resolveTask(task: vscode.Task, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
		const genTask = createTask();
		genTask.definition = task.definition;
		return genTask;
	}
}