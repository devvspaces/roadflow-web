
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
}
