<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html lang="en">
			<head>
				<link rel="stylesheet" type="text/css" href="../css/index.css" />
				<link rel="stylesheet" type="text/css" href="../css/index-precios.css" />
			</head>
			<body>
				<div class="relleno"></div>
				<section id="contenedor-precios" class="contenedor-precios">
					<xsl:for-each select="tarifas/tarifa">
					<div class="box animated css">
						<h3><xsl:value-of select="titulo"/></h3>
						<p><xsl:value-of select="p"/></p>
						<table class="tarifas">
							<tr>
								<xsl:for-each select="tiempo/meses">
								<th class="meses"><xsl:value-of select="."/></th>
								</xsl:for-each>
							</tr>
							<tr>
								<xsl:for-each select="precio/euros">
								<td class="euros"><xsl:value-of select="."/></td>
								</xsl:for-each>
							</tr>
						</table>
					</div>
					</xsl:for-each>
				</section>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>