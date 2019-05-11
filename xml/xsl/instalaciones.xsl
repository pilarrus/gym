<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html lang="en">
			<head>
				<link rel="stylesheet" type="text/css" href="../css/index-instalaciones.css" />
				<link rel="stylesheet" type="text/css" href="../css/index.css" />
			</head>
			<body>
				<section class="instalaciones">
					<article class="explicacion">
						<h3>Explicación de las diferentes zonas de entrenamiento del gimnasio</h3>
						<p>¿Eres nuevo en Healthy Mind y quieres sentirte como en casa cuando estes entrenando?</p>
						<p>A continuación te mostraremos todas las zonas de entrenamiento de tu gimnasio para que sepas qué encontrarás en tu gimnasio y qué zona debes utilizar para hacer cada ejercicio.</p>
					</article>
			
					<div class="contenedor-instalaciones">
					<xsl:for-each select="instalaciones/zona">
						<article class="zona">
							<h3 class="titulo"><xsl:value-of select="titulo"/></h3>
							<img class="icono"><xsl:attribute name="src"><xsl:value-of select="img"/></xsl:attribute></img>
							<p class="texto"><xsl:value-of select="p"/></p>
						</article>
					</xsl:for-each>
					</div>
				</section>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>