import { ReactIssue } from "../store/actions";
import { ApiProvider, Response } from "./";

interface ReactIssuesResponse {
  total_count: number,
  incomplete_results: false,
  items: ReactIssue[]
}

interface GithubReactRepository {
  getIssues(path: string): Response<ReactIssuesResponse>;
}

export class IssuesProvider
  extends ApiProvider
  implements GithubReactRepository {
  
  static _instance = new IssuesProvider();
  
  private constructor() {
    super();
    if (IssuesProvider._instance) {
      throw new Error(
        "Cannot initialize singleton class using new. please use the getInstance method"
      );
    }
    return IssuesProvider._instance;
  }

  getIssues(searchTerm: string): Response<ReactIssuesResponse> {
    return super.get("/search/issues", {
      q: `${searchTerm}+&repo:facebook/react`,
    });
  }

  public static getInstance() {
    return IssuesProvider._instance;
  }
}

