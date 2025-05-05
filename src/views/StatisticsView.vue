<template>
  <app-page>
    <template #title>
      <v-card-title> Statistics </v-card-title>
    </template>

    <template #body>
      <v-container 
        class="bg-blue-grey-darken-2 rounded-lg mx-auto my-7"
        style="border: 2px solid #2979ff"
      >
        <v-chart class="chart" :option="chartOptions" autoresize></v-chart>
      </v-container>
    </template>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/ui/AppPage.vue";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

const chartOptions = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
    backgroundColor: '#37474F',
    textStyle: {
    color: "#EEEEEE",
  },
  },
  legend: {
    orient: "vertical",
    bottom: "bottom",
    data: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
  },
  series: [
    {
      name: "Statistics",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 12,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "18",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 35, name: "Category 1" },
        { value: 25, name: "Category 2" },
        { value: 20, name: "Category 3" },
        { value: 15, name: "Category 4" },
        { value: 0, name: "Category 5" },
      ],
    },
  ],
};
</script>

<style scoped>
.chart {
  height: 600px;
  width: 100%;
  min-width: 350px;
}
</style>
