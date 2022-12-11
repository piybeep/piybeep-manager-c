import React from "react";

import s from "./Form.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import classNames from "classnames";

import OpenEye from "../../../public/svg/OpenEye.svg";
import Image from "next/image";

export default function Form() {
	const [showPass, setShowPass] = React.useState(false);
	const [formError, setFormError] = React.useState<string>();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			login: "",
			password: "",
		},
		onSubmit: (v) => {
			console.log(v);

			if (v.login == "admin" && v.password == "minad") {
				router.push("/");
			} else {
				setFormError("Неверный логин или пароль");
			}
		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: yup.object({
			login: yup.string().trim().required("Вы не ввели логин"),
			password: yup.string().trim().required("Вы не ввели пароль"),
		}),
	});
	return (
		<form className={s.box} onSubmit={formik.handleSubmit}>
			<h3>Авторизация</h3>
			<div
				className={classNames(s.form__input, {
					[s.form__input__error]: formik.errors.login,
				})}
			>
				<input
					value={formik.values.login}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					id="login"
					type="text"
					name="login"
					required
				/>
				<label htmlFor="login">
					{formik.errors.login ? String(formik.errors.login) : "Логин"}
				</label>
			</div>
			<div
				className={classNames(s.form__input, {
					[s.form__input__error]: formik.errors.password,
				})}
			>
				<input
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					id="password"
					type={showPass ? "text" : "password"}
					name="password"
					required
				/>
				<label htmlFor="password">
					{formik.errors.password ? String(formik.errors.password) : "Пароль"}
				</label>
				<button type="button" onClick={() => setShowPass((v) => !v)}>
					{showPass ? (
						<Image alt="" src={OpenEye} />
					) : (
						<svg
							width="18"
							height="10"
							viewBox="0 0 18 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M17.7178 0.791325C17.9988 0.966952 18.0843 1.33712 17.9086 1.61812C17.3818 2.46112 16.7557 3.22795 16.0441 3.89589L17.4852 5.33707C17.7196 5.57139 17.7196 5.95129 17.4853 6.1856C17.2509 6.41992 16.871 6.41992 16.6367 6.1856L15.1211 4.67003C14.1658 5.38362 13.0905 5.93471 11.9203 6.28147L12.4594 8.2934C12.5451 8.61348 12.3552 8.94248 12.0351 9.02824C11.715 9.114 11.386 8.92404 11.3003 8.60396L10.7508 6.55327C10.1847 6.6498 9.60026 6.70011 8.99984 6.70011C8.39939 6.70011 7.81488 6.64979 7.24876 6.55325L6.69937 8.60394C6.61362 8.92403 6.28462 9.11399 5.96454 9.02824C5.64445 8.94248 5.45449 8.61349 5.54025 8.29341L6.07927 6.28144C4.90904 5.93466 3.83369 5.38352 2.8783 4.66986L1.3627 6.18546C1.12838 6.41978 0.748485 6.41978 0.514171 6.18546C0.279856 5.95115 0.279856 5.57125 0.514171 5.33694L1.95541 3.89569C1.24387 3.22781 0.61786 2.46104 0.0910379 1.61812C-0.0845889 1.33712 0.000834133 0.966952 0.281836 0.791325C0.562837 0.615698 0.933008 0.701122 1.10863 0.982123C1.68393 1.90259 2.38635 2.71662 3.1942 3.39112C3.20734 3.40115 3.22017 3.41179 3.23264 3.42305C4.81064 4.72657 6.7863 5.50011 8.99984 5.50011C12.3693 5.50011 15.1875 3.70776 16.891 0.982123C17.0667 0.701121 17.4368 0.615698 17.7178 0.791325Z"
								fill="#666666"
							/>
						</svg>
					)}
				</button>
			</div>
			<span>
				<button type="submit">
					Войти
					<svg
						width="14"
						height="15"
						viewBox="0 0 14 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.14448 1.38877C7.47584 1.38693 7.74297 1.11681 7.74113 0.785441C7.73928 0.454075 7.46916 0.186946 7.1378 0.188791L1.15019 0.222137C0.523917 0.225624 0.0180664 0.734301 0.0180664 1.36058V13.2067C0.0180664 13.8379 0.531644 14.3487 1.16287 14.3452L7.14448 14.3118C7.47584 14.31 7.74297 14.0399 7.74113 13.7085C7.73928 13.3772 7.46916 13.11 7.1378 13.1119L1.21807 13.1448V1.42178L7.14448 1.38877ZM10.5424 4.43931C10.3081 4.20499 9.92817 4.20499 9.69385 4.43931C9.45954 4.67362 9.45954 5.05352 9.69385 5.28784L11.0927 6.68665H5.14111C4.80974 6.68665 4.54111 6.95528 4.54111 7.28665C4.54111 7.61802 4.80974 7.88665 5.14111 7.88665H11.0927L9.69385 9.28546C9.45954 9.51978 9.45954 9.89967 9.69385 10.134C9.92817 10.3683 10.3081 10.3683 10.5424 10.134L12.9655 7.71091C13.1998 7.4766 13.1998 7.0967 12.9655 6.86238L10.5424 4.43931Z"
							fill="#DCDCDC"
						/>
					</svg>
				</button>
				{formError ? <span className={s.error}>{formError}</span> : ""}
			</span>
		</form>
	);
}

