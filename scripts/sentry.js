function getProject(projectId) {
  var projectName = null;
  switch (projectId.toString()) {
    case "5997849":
      projectName = "acad";
      break;
    case "5778741":
      projectName = "acad-gov";
      break;
    case "5778747":
      projectName = "ead";
      break;
    default:
      projectName = "Project not found";
      break;
  }
  return projectName;
}

class Script {
  process_incoming_request({request}) {
    const action = request.content.action;

    if (action == "triggered" || action == "created") {
      const data = request.content.data;
      let event = null;
      let project = null;
      let message = null;
      let culprit = null;
      let issueUrl = null;

      try {
        if ("event" in data) {
          event = data.event;
          project = event.project;
          message = event.title;
          culprit = event.culprit;
          issueUrl = event.web_url;
        };

        if ("issue" in data) {
          issue = data.issue;
          message = issue.title;
          culprit = issue.culprit;
          project = issue.project.id;
          issueUrl = `https://ow7.sentry.io/issues/${issue.id}/`;
        };

        return {
          content: {
            text: `Error in project *${getProject(project)}*.\n*Message:* ${message}\n*Culprit*: ${culprit}\n*Issue:* ${issueUrl}`
          }
        };
      } catch (e) {
        console.log('sentryevent error', e);
        return {
          error: {
            success: false,
            message: `${e.message || e} ${JSON.stringify(data)}`
          }
        };
      }
    }
  }
}
