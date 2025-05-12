<template>
  <app-page>
    <template #title>
      <v-card-title> Statistics </v-card-title>
    </template>

    <template #body>
      <v-container
        v-if="interviewsList.isFetchingData.value"
        class="d-flex justify-center"
      >
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          width="15"
        ></v-progress-circular>
      </v-container>
      <v-container
        class="bg-blue-grey-darken-2 rounded-lg mx-auto my-7"
        style="border: 2px solid #2979ff"
        v-else
      >
        <v-chart
          class="chart"
          :option="chartOptions"
          autoresize
          ref="chartRef"
        ></v-chart>
      </v-container>
    </template>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/AppPage.vue";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import useInterviewsList from "../hooks/interviewsList";
import { onMounted, computed, shallowRef } from "vue";
import useInterviewsStore from "../stores/interviews-storage";

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const interviewsList = useInterviewsList();
const interviewsStore = useInterviewsStore();

const chartRef = shallowRef(null);

const chartOptions = computed(() => {
  const stats = interviewsStore.getInterviewsStats();

  const colorMap = {
    Offer: "#388E3C",
    Refusal: "#D84315",
    Unset: "#0D47A1",
  };

  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "#37474F",
      textStyle: {
        color: "#EEEEEE",
      },
    },
    legend: {
      orient: "vertical",
      bottom: "bottom",
      textStyle: {
        color: "#EEEEEE",
      },
      data: stats.map((item) => item.name),
    },
    color: stats.map(
      (item) => colorMap[item.name as keyof typeof colorMap] || "#0D47A1"
    ),
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
        data: stats,
      },
    ],
  };
});

onMounted(async () => {
  await interviewsList.getAllInteviews();
});
</script>

<style scoped>
.chart {
  height: 600px;
  width: 100%;
  min-width: 350px;
}
</style>
