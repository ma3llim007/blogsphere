import clsx from "clsx";
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ label, type = "text", placeholder, error, className = "", additionalTitle, ...props }, ref) {
    const id = useId();

    return (
        <>
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="inline-block mb-2 pl-1 text-base font-bold">
                        {label} <span className="text-red-500 font-black">*</span>
                    </label>
                )}
                <input
                    type={type}
                    ref={ref}
                    {...props}
                    id={id}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={clsx(
                        "px-3 py-2 rounded-md bg-white text-black dark:bg-slate-800 dark:text-white outline-none text-lg focus:bg-gray-50 duration-200 border border-gray-700 dark:border-gray-400 w-full",
                        className
                    )}
                />
                {additionalTitle && <p className="font-bold mt-2 text-black dark:text-white text-sm">{additionalTitle}</p>}
                {error && <p className="text-red-500 font-bold my-2 text-base px-2">{error}</p>}
            </div>
        </>
    );
});
export default Input;
