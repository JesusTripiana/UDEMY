/* En este fichero se compone de funciones JavaScript para GULP */
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

// Función que compila SASS

function css( ){
    return src("src/scss/app.scss") // Ubicación de donde se encuentra el archivo SASS
        .pipe( sass() ) // Compila el archivo SASS
        .pipe( dest('./build/css') ) // Ubica el archivo compilado en la ubicación pasada por parámetro
}

function minificarcss(){
    return src("src/scss/app.scss") 
        .pipe( sass({
            outputStyle: 'compressed' // Esta funcionalidad comprime al máximo el archivo css compilado (para que ocupe el menor tamaño)
        }) ) 
        .pipe( dest('./build/css') )
}

function watchArchivos(){
    /* Con este metodo le indicamos que WATCH quede a la escucha de modificación del archivo en la ruta pasada por parámetro y 
    que si hay cambios, ejecute la funcion también pasada por parámetro */

    watch("src/scss/**/*.scss" , css) // ** = todas carpetas o archivos con extensión indicada  y * = todos archivos carpeta actual
}
exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos; // Para que este a la escucha ejecutar en terminal 'gulp watchArchivos'



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

/* De esta forma (SERIES), cuando se llame a TAREA se van a aejecutar de forma secuencial las funciones */
/* exports.tareas = series(css, javascript, minificarHTML); */ 

/* PARALLEL hace que las funciones se ejecuten a la vez y que vayan finalizando conforme vayan terminando las acciones en ellas 
exports.tareas = parallel(css, javascript, minificarHTML); 
*/

/* Si en el EXPORTS.(Indicamos)DEFAULT cuando llamemos en la terminal a Gulp no tenemos que pasarle el nombre de la funcion o variable que 
    ejecuta las funciones en el archivo, ya que son las que hay por defecto 
exports.default = parallel(css, minificarHTML);
*/