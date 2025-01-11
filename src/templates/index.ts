import { CliAnswers, HookType } from "../types";
import { getHookTemplate } from "./hook.template";
import { capitalize, getHookType } from "../utils";
import { getServiceTemplate } from "./service.template";
import { getTsFileTemplate } from "./typescript.template";

export class Template {
  answers: CliAnswers;
  /** Type name of response data  */
  responseTypeName: string;
  serviceConstName: string;
  hookType: HookType;
  hookConstName: string;

  constructor(answers: CliAnswers) {
    this.answers = answers;
    const { hook_file_name, service_method } = answers;

    const capitalizedHookType = capitalize(getHookType(service_method));

    this.serviceConstName = hook_file_name
      .replace("use", "")
      .replace(".tsx", "");
    this.hookType = getHookType(service_method);
    this.hookConstName = hook_file_name.replace(".tsx", "");
    this.responseTypeName = `${this.serviceConstName}${capitalizedHookType}Response`;
  }

  public typeScriptTemplate() {
    return getTsFileTemplate(this.answers, this.responseTypeName);
  }

  public serviceTemplate() {
    return getServiceTemplate(
      this.answers,
      this.responseTypeName,
      this.serviceConstName,
    );
  }

  public hookTemplate() {
    return getHookTemplate({
      hookConstName: this.hookConstName,
      responseTypeName: this.responseTypeName,
      serviceConstName: this.serviceConstName,
      serviceFileName: this.answers.service_file_name,
      hookType: this.hookType,
    });
  }
}
