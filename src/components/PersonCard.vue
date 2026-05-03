<script setup>
const props = defineProps({
  name: { type: String, required: true },
  sub: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
  variant: { type: String, default: 'default' }, // default | leader | pi | student
  role: { type: String, default: '' }, // academic | industry | engineering
  glow: { type: Boolean, default: false },
})

function initials(name) {
  if (!name) return '?'
  return name.slice(-2)
}
</script>

<template>
  <div class="person" :class="[`size-${size}`, `variant-${variant}`, { glow }]">
    <div class="avatar" :class="role ? `role-${role}` : ''">
      <span>{{ initials(name) }}</span>
    </div>
    <div class="meta">
      <div class="name-line">
        <span class="name">{{ name }}</span>
        <slot name="badge" />
      </div>
      <div v-if="sub" class="sub">{{ sub }}</div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.person {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: 14px;
  padding: 10px 16px 10px 10px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  min-width: 0;
}
.person:hover {
  transform: translateY(-1px);
  border-color: rgba(14, 165, 233, 0.45);
  box-shadow: var(--shadow-md);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(14, 165, 233, 0.25);
}
.avatar.role-academic { background: linear-gradient(135deg, #0ea5e9, #6366f1); }
.avatar.role-industry { background: linear-gradient(135deg, #f59e0b, #ef4444); }
.avatar.role-engineering { background: linear-gradient(135deg, #14b8a6, #0ea5e9); }

.meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.name-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.name {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
}

.sub {
  font-size: 11.5px;
  color: var(--color-text-subtle);
  margin-top: 2px;
  line-height: 1.35;
}

/* sizes */
.size-sm { padding: 6px 12px 6px 6px; gap: 8px; border-radius: 999px; }
.size-sm .avatar { width: 28px; height: 28px; font-size: 11px; }
.size-sm .name { font-size: 13px; }
.size-sm .sub { font-size: 10.5px; }

.size-lg { padding: 14px 20px 14px 14px; gap: 14px; border-radius: 18px; }
.size-lg .avatar { width: 52px; height: 52px; font-size: 16px; }
.size-lg .name { font-size: 17px; }
.size-lg .sub { font-size: 12.5px; }

/* variants */
.variant-leader {
  background: linear-gradient(135deg, #ffffff, #f0f9ff);
  border: 1px solid rgba(14, 165, 233, 0.4);
  box-shadow: 0 6px 22px rgba(14, 165, 233, 0.18);
}
.variant-leader .avatar {
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6, #14b8a6);
  width: 56px;
  height: 56px;
  font-size: 18px;
}
.variant-leader .name { font-size: 18px; }

.variant-pi {
  background: #fff;
  border: 1px solid var(--color-border-soft);
}

.variant-student {
  background: #fff;
  border: 1px dashed var(--color-border);
  border-radius: 999px;
  padding: 5px 12px 5px 5px;
  box-shadow: none;
}
.variant-student .avatar {
  width: 24px;
  height: 24px;
  font-size: 10px;
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  box-shadow: none;
}
.variant-student .name { font-size: 12.5px; font-weight: 600; }
.variant-student:hover { border-color: rgba(14, 165, 233, 0.5); border-style: solid; }

.glow {
  position: relative;
}
.glow::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 22px;
  background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.18), transparent 70%);
  z-index: -1;
}
</style>
