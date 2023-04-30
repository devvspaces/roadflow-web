import { CurriculumSyllabi, EnrolledCurriculumPageResponse, SyllabiTopic } from "./curriculum";


export interface Grades {
  curriculum: EnrolledCurriculumPageResponse,
  progress: {
    id: number;
    completed: boolean;
    completed_at: string;
    quiz_mark: number;
    last_attempted: string;
    topic: Omit<SyllabiTopic, "outlines">;
    syllabi: Omit<CurriculumSyllabi, "outlines" | "topics"> 
  }[]
}
