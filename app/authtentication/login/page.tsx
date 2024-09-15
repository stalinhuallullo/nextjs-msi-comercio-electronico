"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

type FormData = {
    email: string;
    password: string;
    remember: boolean;
};

type LoginResponseOK = {
    CodigoRespuesta?: string;
    TXTRESPUESTA?: string;
    Datos?: object | object[];
};

type LoginResponseERROR = {
    Message?: string;
};



export default function Login() {
    //const router = useRouter()
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorApi, setErrorApi] = useState<string | null>(null)

    const {
        register,
        setValue,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async (dataSubmit: FormData) => {
        setErrorApi("")
        setIsLoading(true)
        const requestJson = {
            "email": dataSubmit.email,
            "password": dataSubmit.password
        }


        try {
            const apiResponse = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(requestJson),
            })

            const dataResponse: LoginResponseOK | LoginResponseERROR = await apiResponse.json()


            if (dataResponse.CodigoRespuesta != null && dataResponse.CodigoRespuesta == '01') {
                //localStorage.getItem("basket");
                let userJson = {
                    user: dataResponse.Datos[0],
                    token: "xyz-123"
                }

                localStorage.setItem("AUTH", JSON.stringify(userJson));
                setIsLoading(false)

                push('/dashboard/home')
            } else if (dataResponse.CodigoRespuesta != null && dataResponse.CodigoRespuesta == '02') {
                // Handle errors
                setErrorApi(dataResponse.TXTRESPUESTA)
                setIsLoading(false)
            } else {
                setErrorApi(dataResponse.Message)
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }

    }
    /*const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            const formData = new FormData(event.currentTarget)
            console.log("formData ==> ", formData.values.email)
            const response = await fetch('/api/submit', {
              method: 'POST',
              body: formData,
            })
         
            // Handle response if necessary
            const data = await response.json()
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }*/
 
    const handlerredirect = () => {
        console.log("dddd")
        push('/dashboard/home');
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <button onClick={() => handlerredirect()}>taylor</button>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        width={500}
                        height={500}
                        alt="logo" />
                    MSI
                </a> */}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicia sesión en tu cuenta
                        </h1>
                        {errorApi && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {errorApi}
                        </div>}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario / Correo electrónico:</label>
                                <input type="text"
                                    {...register(
                                        "email", {
                                        required: {
                                            value: true,
                                            message: "El correo es requerido"
                                        },
                                        // pattern: {
                                        //     value: /\S+@\S+\.\S+/,
                                        //     message: "El correo electrónico no es valido",
                                        // },
                                    })}
                                    className={`${errors.email && `border-red-500 outline outline-0 placeholder-shown:border placeholder-shown:border-red-500 focus:border-1 focus:border-red-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`} bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña:</label>
                                <input type="password"
                                    {...register(
                                        "password", {
                                        required: {
                                            value: true,
                                            message: "El correo es requerido"
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "La longitud mínima es 5 caracteres",
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "La longitud máxima es 30 caracteres",
                                        }
                                    })}
                                    className={`${errors.password && `border-red-500 outline outline-0 placeholder-shown:border placeholder-shown:border-red-500 focus:border-1 focus:border-red-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`} bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input {...register("remember")} aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">Recuérdame</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Has olvidado tu contraseña?</a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isLoading}>
                                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Aún no tienes una cuenta? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}