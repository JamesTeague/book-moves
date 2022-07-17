<template>
  <div class="container mx-auto">
    <div
      class="bg-white shadow overflow-hidden sm:rounded-lg"
      v-for="study in studies"
      :key="study.id"
      @click="onClick(study.id)"
      style="cursor: pointer"
    >
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ study.title }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ study.description }}
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Color</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ study.color }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Updated At</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ new Date(study.updatedAt).toDateString() }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// eslint-disable-next-line no-undef
const { studyRepository } = inject('repositories') as App.Repositories;
const onClick = (id: string) => {
  router.push(`/study/${id}`);
};

const studies = await studyRepository.getStudies();
</script>
