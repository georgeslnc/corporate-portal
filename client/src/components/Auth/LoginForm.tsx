import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string,
  password: string,
};

export default function LoginForm() {

  // const [selectedValue, setSelectedValue] = useState<string | null>("");
  const { register, handleSubmit, reset} = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
      </form>
    </>
  );
}
