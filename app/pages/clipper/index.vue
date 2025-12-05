<script setup lang="ts">
import { onMounted,ref,useTemplateRef } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js'

import { Button } from "@/components/ui/button";
import { Slider } from '@/components/ui/slider'
import { isAbsent,type Maybe } from '@/utils/optional';

const videoElement = useTemplateRef<HTMLVideoElement>('videoElement');
const containerElement = useTemplateRef<HTMLElement>('containerElement');
const sliderElement = useTemplateRef<HTMLElement>('sliderElement');
const wavesurfer = ref<Maybe<WaveSurfer>>(null);
const region = ref<Maybe<RegionsPlugin>>(null);

const updateZoom = (payload: Maybe<number[]>) => {

  if (isAbsent(payload) || isAbsent(payload[0]) || isAbsent(wavesurfer.value)) return

  wavesurfer.value.zoom(payload[0]);
}

onMounted(() => {
  if (
    isAbsent(videoElement.value) ||
    isAbsent(containerElement.value)||
    isAbsent(sliderElement.value)
  ) return

  region.value = RegionsPlugin.create()

  wavesurfer.value = WaveSurfer.create({
    container: containerElement.value,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    media: videoElement.value,
    barWidth: 10,
    barGap: 1,
    barRadius: 10,
    minPxPerSec: 100,
    plugins: [
      TimelinePlugin.create(),
      region.value!,
     ]
  })
});

const createRegion = () => {
  if (isAbsent(region.value) || isAbsent(wavesurfer.value)) return

  region.value.addRegion({
    start: wavesurfer.value.getCurrentTime(),
    end: wavesurfer.value.getCurrentTime()+2,
    color: 'rgba(0, 255, 0, 0.3)',
    drag: false,
    resize: true,
  });
}

//Révision:
// A partir du slide 7 à 39 pour le slide 3_d le truc avec le moteur de règle

</script>
<template>

    <div ref="containerElement" >
        <video
            ref="videoElement"
            src="/test.mp4"
            controls
            style="width: 600px; height: 400px;"
        ></video>
        <Slider
            ref="sliderElement"
           :default-value="[50]"
           :max="100"
           :step="1"
           class="w-[60%]"
           @update:model-value="updateZoom"
         />
         <Button @click="createRegion">Cut</Button>
    </div>
</template>
