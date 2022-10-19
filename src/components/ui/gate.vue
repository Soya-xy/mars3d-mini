<script setup lang='ts'>
defineProps<{
  gate: any
}>()
</script>

<template>
  <div>
    <p class="text-center">
      {{ gate.name }}：ETC门架---<span class="text-[#38ff00]">运行正常</span>
    </p>
    <template v-if="gate.direction === 1">
      <p class="border-gray-300 text-left">
        当日通行车流量(下行)
      </p>
      <div class="flex justify-between items-center">
        <p>最大流量：1983</p>
        <p>最小流量：819</p>
        <p>平均流量：1942</p>
      </div>
    </template>
    <p class="border-gray-300 border-t-1 text-left">
      实时电流/电压
    </p>
    <div class="flex justify-between items-center">
      <p>IA：7.1A</p>
      <p class="ml-3 text-left">
        IB：2.4A
      </p>
      <p class="ml-3">
        IC：7A
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p>UA：231.6V</p>
      <p class="ml-3 text-left">
        UB：232.8V
      </p>
      <p class="ml-3">
        UC：231.3V
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p>UAB：402.3V</p>
      <p class="ml-3 text-left">
        UBC：402.8V
      </p>
      <p class="ml-3">
        UCA：401.3V
      </p>
    </div>
    <p class="border-gray-300 border-t-1 text-center">
      实时功率
    </p>
    <div class="flex justify-between items-center">
      <p>有功功率</p>
      <p class="ml-3">
        4.3kW
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p>无功功率</p>
      <p class="ml-3">
        1.4kVar
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p>视在功率</p>
      <p class="ml-3">
        4.8kVA
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p>负载率</p>
      <p class="ml-3">
        1.55%
      </p>
    </div>
    <p class="border-gray-300 border-t-1 text-center">
      实时用电量
    </p>
    <div class="flex justify-between items-center">
      <p>当日用电</p>
      <p class="ml-3">
        36.68kWh
      </p>
    </div>
    <div class="flex justify-between items-center">
      <p>昨日用电</p>
      <p class="ml-3">
        37.6kWh
      </p>
      <p class="ml-3 text-green-400">
        环比：2.45%↓
      </p>
    </div>
  </div>
</template>
