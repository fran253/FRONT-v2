<script setup lang="ts">
// Imports
import { ref } from "vue";

// Variables
const sheet = ref(false);
const dialog = ref(false);
</script>

<template>
    <section class="InfoSection">
      <div class="InfoSection__Card">
        <h3>Sube y comparte tests</h3>
        <p>Facilitamos la creación y distribución de tests para mejorar el aprendizaje.</p>
      </div>
      <div class="InfoSection__Card">
        <h3>Comparte archivos y documentos</h3>
        <p>Un espacio donde los estudiantes pueden encontrar y compartir apuntes, resúmenes y ejercicios.</p>
      </div>
      <div class="InfoSection__Card">
        <h3>Repositorios públicos para profesores</h3>
        <p>Los profesores pueden organizar y compartir material académico con sus alumnos de manera eficiente.</p>
      </div>
    </section>

    <!-- Nueva sección para los botones -->
    <section class="InfoSection__Botones">
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <div class="InfoSection__Botones__Contenedor">
            <v-btn v-bind="activatorProps" color="orange-darken-3" size="x-large" class="circular-btn" icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card title="Más información">
          <v-card-text>
            1. Introducción

            Bienvenido a AcademIQ (en adelante, "la Plataforma"). Tu privacidad es una prioridad para nosotros. En esta política de privacidad explicamos cómo recopilamos, usamos, protegemos y compartimos tu información cuando utilizas nuestra plataforma de cursos en línea.

            2. Información que Recopilamos

            Cuando accedes y utilizas la Plataforma, podemos recopilar los siguientes tipos de información:

            a) Información proporcionada por el usuario

            Datos personales: Nombre, dirección de correo electrónico, nombre de usuario y otra información que ingreses al registrarte.

            Información académica: Cursos en los que te inscribes, progreso en el aprendizaje y resultados en tests.

            b) Información recopilada automáticamente

            Datos de uso: Interacciones con la Plataforma, páginas visitadas, tiempo de conexión y preferencias de contenido.

            Datos técnicos: Dirección IP, tipo de dispositivo, navegador, sistema operativo y configuración de idioma.

            3. Uso de la Información

            Utilizamos la información recopilada para los siguientes fines:

            Proporcionar acceso a la Plataforma y sus funcionalidades.

            Mejorar la experiencia del usuario y personalizar el contenido.

            Gestionar la inscripción en cursos y evaluar el rendimiento académico.

            Enviar notificaciones y actualizaciones relevantes.

            Garantizar la seguridad y prevenir fraudes o accesos no autorizados.

            4. Compartición de Datos

            No compartimos tu información personal con terceros, salvo en las siguientes circunstancias:

            Proveedores de servicio: Trabajamos con terceros que nos ayudan a operar la Plataforma, como servicios de hosting y análisis de datos.

            Cumplimiento legal: Podemos compartir información si es requerido por la ley o en respuesta a solicitudes legales de autoridades competentes.

            5. Seguridad de la Información

            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdida o alteración. Sin embargo, ninguna transmisión en Internet es 100% segura, por lo que no podemos garantizar una protección absoluta.

            6. Tus Derechos

            Tienes derecho a acceder, rectificar, eliminar y limitar el uso de tu información personal. Para ejercer estos derechos, puedes ponerte en contacto con nosotros en [correo de contacto].

            7. Cookies y Tecnologías de Seguimiento

            Utilizamos cookies y tecnologías similares para mejorar tu experiencia en la Plataforma. Puedes gestionar tus preferencias de cookies desde la configuración de tu navegador.

            8. Cambios en la Política de Privacidad

            Nos reservamos el derecho de actualizar esta política en cualquier momento. Cualquier cambio será notificado a través de la Plataforma o por correo electrónico.

            Si tienes preguntas o inquietudes sobre esta política, contáctanos en [correo de contacto].

            AcademIQ

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Cerrar" @click="dialog = false"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-bottom-sheet v-model="sheet">
        <template v-slot:activator="{ props }">
          <div class="InfoSection__Botones__Contenedor">
            <v-btn v-bind="props" color="orange-darken-3" size="x-large" class="circular-btn" icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </template>
        <v-list>
          <v-list-subheader>Nuestras redes sociales</v-list-subheader>
          <v-list-item v-for="(tile, index) in ['Instagram', 'Facebook', 'Youtube']" :key="index" :title="tile" />
        </v-list>
      </v-bottom-sheet>
    </section>
</template>

<style lang="scss" scoped>
.InfoSection {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 15%;
  padding: 0 15px;
  margin-bottom: 3%;
}

.InfoSection__Card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
  width: 100%;
}

.InfoSection__Card:nth-child(1) {
  background-color: #ffffff;
  color: #F7A277;
  border: 2px solid #FF5500;
}

.InfoSection__Card:nth-child(2) {
  background-color: #ffffff;
  color: #F7A277;
  border: 2px solid #FF5500;
}

.InfoSection__Card:nth-child(3) {
  background-color: #ffffff;
  color: #F7A277;
  border: 2px solid #FF5500;
}

.InfoSection__Botones {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 1%;
  margin-bottom: 5%;
}

@media (min-width: 768px) {
  .InfoSection {
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    margin-top: 70px;
    padding: 0 50px;
  }
  .InfoSection__Card {
    padding: 25px;
    flex: 1;
  }
}
</style>
