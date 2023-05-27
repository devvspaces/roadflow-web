
export interface QuizOption {
  id: number;
  option: string;
  reason: string;
  correct: boolean;
}

export interface Quiz {
  id: number;
  options: QuizOption[];
  question: string;
}

export interface TopicQuiz {
  quiz: Quiz[];
  mark: number;
  remaining_time: number;  // in seconds
  completed: boolean;
}


export interface QuizSubmitResponse {
  quiz: {
    [key: string]: {
      selected: string;
      is_correct: boolean;
      reason: string;
    }
  }[];
  mark: number;
  remaining_time: number;  // in seconds
}
