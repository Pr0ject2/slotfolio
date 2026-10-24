"use client";
export default function SpanishError({retry}:{retry:()=>void}){return <div lang="es" className="not-found"><span className="eyebrow accent">Error de carga</span><h1>No se ha podido<br />abrir la página.</h1><p>Intenta cargarla de nuevo.</p><button className="button" onClick={retry}>Reintentar</button></div>;}
