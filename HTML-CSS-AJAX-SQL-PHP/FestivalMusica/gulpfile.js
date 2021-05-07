/* En este fichero se compone de funciones JavaScript para GULP   --  comandos terminal => npm i --save-dev "nombre de extensión" (palabras después del require)*/
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

// Constante con RUTAS relativas 
const paths = {
    imagenes: "src/img/**/*",
    scss:"src/scss/**/*.scss"
}

function css( ){
    return src(paths.scss) // Ubicación de donde se encuentra el archivo .SASS
        .pipe( sass({
            outputStyle: 'expanded' // Esta funcionalidad da formato al archivo css compilado (para que se vea más espaciado y mejor)
        }) ) 
        .pipe( dest('./build/css') ) // Ubica el archivo compilado en la ubicación pasada por parámetro
}

function minificarcss(){
    return src(paths.scss) 
        .pipe( sass({
            outputStyle: 'compressed' // Esta funcionalidad comprime al máximo el archivo css compilado (para que ocupe el menor tamaño)
        }) ) 
        .pipe( dest('./build/css') )
}

function imagenes(){
    /* Este metodo comprime o hace más ligeras las imagenes del proyecto */
    return src(paths.imagenes)  // ** = todas carpetas o archivos dentro de la ubicación  y * = todos archivos da igual su extensión 
        .pipe( imagemin())
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Imagen Minificada'}) ); // Notifica el procesamiento de cada imagen 
}

function versionWebp(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Versión WebP lista'}) );
}

function watchArchivos(){
    /* Con este metodo le indicamos que WATCH quede a la escucha de modificación del archivo en la ruta pasada por parámetro y 
    que si hay cambios, ejecute la funcion también pasada por parámetro */

    watch(paths.scss, css); // ** = todas carpetas o archivos con extensión indicada  y * = todos archivos carpeta actual con extensión .scss
}
exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos; // Para que este a la escucha ejecutar en terminal 'gulp watchArchivos'
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

exports.default = series(css, imagenes, versionWebp, watchArchivos); // Forma de ejecutar varias funciones solo poniendo en terminal GULP


/* EJEMPLOS */
/*
function css( done ){
    console.log('Compilando SASS');

    done(); /* forma de finalizar la funcion (Necesita que le pases DONE como parametro a la función) 
}
function javascript( done ){
    console.log('Compilando JavaScript');
    done();
}
function minificarHTML( done ){
    console.log('Minificando......');
    done();
} 
*/


/* indicas con EXPORTS.(NOMBRE) como vas a llamar a la funcion en la terminal poniendo GULP (NOMBRE) 
exports.css = css; 
exports.javascript = javascript;
*/

/* SERIES, cuando se llame a TAREA se van a ejecutar de forma secuencial las funciones */
/* exports.tareas = series(css, javascript, minificarHTML); */ 

/* PARALLEL hace que las funciones se ejecuten a la vez y que vayan finalizando conforme vayan terminando las acciones en ellas 
exports.tareas = parallel(css, javascript, minificarHTML); 
*/

/* Si en el EXPORTS.(Indicamos)DEFAULT cuando llamemos en la terminal a Gulp no tenemos que pasarle el nombre de la funcion o variable que 
    ejecuta las funciones en el archivo, ya que son las que hay por defecto 
exports.default = parallel(css, minificarHTML);
*/