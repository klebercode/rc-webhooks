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
    const action = request.action;

    if (action == "triggered") {
      const data = request.content.data;
      let event = null;
      let project = null;
      let title = null;
      let culprit = null;
      let issueUrl = null;

      try {
        if ("event" in data) {
          event = data.event;
          project = event.project;
          title = event.title;
          culprit = event.culprit;
          issueUrl = event.web_url;
        };

        if ("issue" in data) {
          issue = data.issue;
          title = issue.title;
          culprit = issue.culprit;
          // project = `${issue.project.slug} (${issue.project.id})`;
          project = issue.project.id;
          issueUrl = `https://ow7.sentry.io/issues/${issue.id}/`;
        };

        return {
          content: {
            text: `Error in project *${getProject(project)}*.\n*Title:* ${title}\n*Culprit*: ${culprit}\n*Issue:* ${issueUrl}`
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
