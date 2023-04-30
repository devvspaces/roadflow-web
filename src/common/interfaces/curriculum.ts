import { Resource } from "./resource";

export enum CurriculumDifficulty {
  Beginner = "B",
  Intermediate = "I",
  Advanced = "A"
}

export function getDifficulty(val: CurriculumDifficulty) {
  switch (val) {
    case CurriculumDifficulty.Beginner:
      return "Beginner"

    case CurriculumDifficulty.Intermediate:
      return "Intermediate"

    case CurriculumDifficulty.Advanced:
      return "Advanced"

    default:
      break;
  }
  return ""
}

export interface CurriculumListResponse {
  id: number;
  weeks: number;
  name: string;
  description: string;
  objective: string;
  prerequisites: string;
  enrolled: number;
  difficulty: CurriculumDifficulty;
  rating: number;
  ratings: number;
  slug: string;
}

export interface SyllabiTopic {
  id: number;
  order: number;
  title: string;
  slug: string;
  description: string;
  outlines: string[];
  syllabi: number;
}

export interface SyllabiTopicWithResources extends SyllabiTopic {
  resources: Resource[]
}

export interface CurriculumSyllabi {
  id: number;
  order: number;
  title: string;
  slug: string;
  description: string;
  curriculum: number;
  outlines: string[];
  topics: SyllabiTopic[];
}

export interface EnrolledCurriculumSyllabi extends CurriculumSyllabi {
  completed: boolean;
}

export interface CurriculumPageResponse extends CurriculumListResponse {
  syllabus: CurriculumSyllabi[];
}

export interface CurriculumWithResources extends CurriculumListResponse {
  resources: Resource[];
  syllabus: EnrolledCurriculumSyllabi[];
}

export interface EnrolledCurriculumPageResponse extends CurriculumListResponse {
  syllabus: EnrolledCurriculumSyllabi[];
}

export interface SyllabiTopicResponse {
  id: number;
  syllabi: CurriculumSyllabi;
  topic: SyllabiTopicWithResources;
  completed: boolean;
  completed_at: string;
}

export interface EnrolledCurriculumsResponse {
  id: number;
  completed_weeks: number;
  curriculum: CurriculumListResponse;
  completed: boolean;
  progress: number;
  enrolled_at: string;
}
