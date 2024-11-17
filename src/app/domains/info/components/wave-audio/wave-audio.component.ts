import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  //recibir la direccion del input
  @Input({required: true}) audioUrl: string = '';

  //obtener la referencia del componente html donde se va pintar la interfaz del audio
  @ViewChild('wave') container! : ElementRef;
  private ws! : WaveSurfer;

  //saber en que estado esta el boton para poner pausa o reproducir
  isPlaying = signal(false);

  //lo uso para saber que le elemento ya se renderizo, obtener la referencia y enviarla a la libreria
  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement //donde generar la vista de audio en js vanilla seria en document.getElelemntById(elemento)
    });
    //vigilar si el audio se esta reproduciendo o no
    this.ws.on('play', () => this.isPlaying.set(true));
    this.ws.on('pause', () => this.isPlaying.set(false));
  }

  //*********** PARA USARLO LO HAGO EN EL COMPONENTE ABOUT, lo importo en el ts de ese componente */

  playPause() {
    this.ws.playPause();
  }
}
