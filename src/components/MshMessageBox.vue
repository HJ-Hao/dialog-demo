<template>
  <el-dialog v-model="trigger" width="25%" top="30vh" @closed="emit('vanish')" :before-close="handleClose">
    <template #header>
      <div :class="$style.header">
        <span :class="$style.title">{{ title }}</span>
      </div>
    </template>
    <div :class="$style.content">
      {{ message }}
    </div>
    <template #footer>
      <span :class="$style.footer">
        <el-button @click="handleAction('cancle')">取消</el-button>
        <el-button type="primary" @click="handleAction('confirm')" style="background: #064dff">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElDialog, ElButton } from 'element-plus';
import { nextTick, ref } from 'vue';``
defineProps({
  message: {
    type: String,
    default: 'message',
  },
  title: {
    type: String,
    default: 'title',
  },
});
console.log(ElDialog, ElButton);

const emit = defineEmits(['action', 'vanish']);

const trigger = ref(false);

const handleAction = (action) => {
  if (!trigger.value) {
    return;
  }
  trigger.value = false;
  emit('action', action);
};

const handleClose = (done) => {
  emit('action', 'cancle');
  nextTick(() => {
    done();
  });
};
</script>
<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  .title {
    font-weight: 500;
    line-height: 20px;
    color: #121212;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}

.content {
  padding: 0 30px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > :not(:last-child) {
    margin-right: 5px;
  }
  :global {
    .ElButton {
      padding: 6px 25px;
    }
  }
}
</style>
