
export enum ResourceType {
  Course = "C",
  Article = "A",
  Book = "B",
  Video = "V",
  Other = "O"
}

export function getResource(val: ResourceType) {
  switch (val) {
    case ResourceType.Course:
      return "Course"

    case ResourceType.Article:
      return "Article"

    case ResourceType.Book:
      return "Book"
    
    case ResourceType.Video:
      return "Video"

    case ResourceType.Other:
      return "Other"

    default:
      break;
  }
  return ""
}


export interface Resource {
  id: number;
  name: string;
  url: string;
  description: string;
  author: string;
  rtype: ResourceType;
  provider: string;
}