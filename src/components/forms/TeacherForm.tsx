"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';

const schema = z.object({
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: 'Invalid email address!' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    phone: z.string().min(1, { message: 'Phone is required' }),
    address: z.string().min(1, { message: 'Address Name is required' }),
    bloodType: z.string().min(1, { message: 'Blood Type is required' }),
    birthday: z.date({ message: 'Birthday Name is required' }),
    sex: z.enum(["male", "female"], { message: "sex is required" }),
    img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

export default function TeacherForm({ type, data }: { type: "create" | "update"; data?: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(data => {
        console.log(data);
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className='font-semibold text-xl'>Create a new Teaceher</h1>
            <span className='text-sx text-gray-400 font-medium'>Authentication Information</span>
            <InputField label={'Username'} register={register} name={'username'} defaultValue={data?.username} error={errors?.username}/>
            <InputField label={'Email'} type='email' register={register} name={'email'} defaultValue={data?.email} error={errors?.email}/>
            <InputField label={'Password'} type='password' register={register} name={'password'} defaultValue={data?.password} error={errors?.password}/>
            <span className='text-sx text-gray-400 font-medium'>Personal Information</span>
            <div className="">
                 <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
            </div>
            <button className='bg-blue-400 text-white p-3 rounded-md'>{type === "create" ? "create" : "update"}</button>
        </form>
    )
}