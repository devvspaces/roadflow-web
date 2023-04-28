import { PagerDto } from "./paginated";

export interface GetCurriculumDto extends PagerDto {
  search?: string;
}
