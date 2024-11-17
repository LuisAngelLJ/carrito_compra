import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnChanges, OnInit, OnDestroy {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  count = signal(0);
  //detener el contador
  countRef: number | undefined;

  constructor() {
    //aquí va todo el código no saincrono
    console.log("Constructor");
    console.log('_'.repeat(10));
  }

  ngOnInit(): void {
    //antes de renderizar y solo se ejecuta una vez
    console.log("ngOnInit");
    console.log("duration ", this.duration);
    console.log("message ", this.message);

    this.countRef = window.setInterval(() => {
      console.log("interval");
      this.count.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngAfterViewInit() {
    //después del render
    //se ejecuta cuando los hijos de este componente fueron renderizados
    console.log("ngAfterViewInit");
  }

  ngOnChanges(changes: SimpleChanges): void {
    //se ejecuta antes y durante el render del componente
    //detecta si hay cambios
    console.log("ngCahnges");
    //que cambio
    console.log(changes);
    const duration = changes['duration'];
    //evaluar que cambios quiero monitorear
    if(duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  doSomething() {
    console.log("change duration");
  }

  ngOnDestroy(): void {
    //monitorea cuando el componente se destruye
    console.log("ngOnDestroy");
    //limpiar contador
    window.clearInterval(this.countRef);
  }
}
