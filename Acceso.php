<?php
// Verificar si el formulario se ha enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Obtener los valores enviados por el formulario
  $usuario = $_POST['usuario'];
  $contrasena = $_POST['contrasena'];

  // Conectarse a la base de datos
  $conexion = mysqli_connect('localhost', 'usuario', 'contraseña', 'basededatos');

  // Verificar si la conexión fue exitosa
  if (!$conexion) {
    die('Error de conexión: ' . mysqli_connect_error());
  }

  // Buscar el usuario en la base de datos
  $consulta = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND contrasena = '$contrasena'";
  $resultado = mysqli_query($conexion, $consulta);

  // Verificar si se encontró un usuario válido
  if (mysqli_num_rows($resultado) === 1) {
    // Iniciar sesión y redirigir al usuario a la página de inicio
    session_start();
    $_SESSION['usuario'] = $usuario;
    header('Location: inicio.php');
    exit;
  } else {
    // Mostrar un mensaje de error si los datos de inicio de sesión son incorrectos
    $mensajeError = 'El usuario o la contraseña son incorrectos.';
  }

  // Cerrar la conexión a la base de datos
  mysqli_close($conexion);
}
?>
