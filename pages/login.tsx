export default function Login() {
	return (
		<section style={{ textAlign: "center" }}>
			<form>
				<h1>Авторизация</h1>
				<input type="text" name="login" id="input__login" />
				<br />
				<input type="password" name="password" id="input__password" />
				<br />
				<br />
				<input type="submit" value="Войти" />
			</form>
		</section>
	);
}
