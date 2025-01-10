import { CliAnswers, HookType, RequestMethods } from "@/types";
import { capitalize } from "@/utils/capitalize.util";
import { getTsFileTemplate } from "./typescript.template";
import { getServiceTemplate } from "./service.template";
import { getHookType } from "@/utils/get-hook-type";
import { getHookTemplate } from "./hook.template";

export class Template {
  answers: CliAnswers;
  /** Type name of response data  */
  responseTypeName: string;
  serviceConstName: string;
  hookType: HookType;
  hookConstName: string;

  constructor(answers: CliAnswers) {
    this.answers = answers;
    const { hook_name, service_method } = answers;

    const capitalizedHookType = capitalize(getHookType(service_method));

    this.hookType = getHookType(service_method);

    this.serviceConstName = hook_name.replace("use", "").replace(".tsx", "");

    this.responseTypeName = `${this.serviceConstName}${capitalizedHookType}Response`;
    this.hookConstName = hook_name.replace(".tsx", "");
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
