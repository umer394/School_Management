"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';
import Image from 'next/image';

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

export default function StudentForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
    <form onSubmit={onSubmit} className="flex flex-col gap-8  w-full">
      <h1 className='font-semibold text-xl'>Create a new Student</h1>
      <span className='text-sx text-gray-400 font-medium'>Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">

        <InputField label={'Username'} register={register} name={'username'} defaultValue={data?.username} error={errors?.username} />
        <InputField label={'Email'} type='email' register={register} name={'email'} defaultValue={data?.email} error={errors?.email} />
        <InputField label={'Password'} type='password' register={register} name={'password'} defaultValue={data?.password} error={errors?.password} />
      </div> 
      <span className='text-sx text-gray-400 font-medium'>Personal Information</span>

      <div className="flex justify-between flex-wrap gap-4">
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
      
      <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className='text-xs text-gray-500'>Sex</label>
            <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' {...register("sex")} defaultValue={data?.sex}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex?.message && <p className='text-xs text-red-400'>{errors.sex?.message.toString()}</p>}

        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
            <label className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer' htmlFor='img'>
              <Image src={'/upload.png'} alt={''} width={28} height={28}/>
              <span>Upload a photo</span>
            </label>
            <input className='hidden' type='file' {...register("img")}  id='img'>
              
            </input>
            {errors.img?.message && <p className='text-xs text-red-400'>{errors.img.message.toString()}</p>}

        </div>
        </div>
      <button className='bg-blue-400 text-white p-3 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
    </form>
  )
}