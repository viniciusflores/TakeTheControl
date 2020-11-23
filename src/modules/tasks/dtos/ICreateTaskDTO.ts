export default interface ICreateTaskDTO {
  user_id: string;
  title: string;
  description: string | null;
  status: string;
}
