---
title: "Image Merger"
date: 2026-01-20T10:00:00+07:00
description: "Tool to merge multiple images into one file (Vertical/Horizontal/Grid). Features border, spacing, and reordering."
icon: "icon-[ri--layout-masonry-line]"
---

<!-- SortableJS Library -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>

<div x-data="imageMerger()" x-init="init()" class="max-w-[90rem] mx-auto mt-6">

<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

<!-- Sidebar Controls -->
<div class="lg:col-span-4 xl:col-span-3 space-y-6">

<!-- Upload Section -->
<div class="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
<label class="block font-bold text-gray-700 dark:text-gray-200 mb-2 !mt-0 flex items-center gap-2 text-sm">
<i class="icon-[ri--image-add-line] text-indigo-500"></i> Upload Images
</label>
<div class="relative group">
<input type="file" multiple accept="image/*" @change="handleFiles" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
<div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-3 text-center transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">
<i class="icon-[ri--upload-cloud-2-line] text-xl text-gray-400 mb-1"></i>
<p class="mb-0 mt-0 text-xs text-gray-500 dark:text-gray-400 font-medium">Click or drag images here</p>
</div>
</div>
</div>

<!-- Settings Section -->
<div class="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-5">
<h3 class="font-bold text-gray-700 dark:text-gray-200 !mt-0 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
<i class="icon-[ri--equalizer-line] text-emerald-500"></i> Settings
</h3>

<!-- Direction -->
<div>
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Layout</label>
<div class="grid grid-cols-3 gap-2">
<button @click="layout = 'vertical'; render()" :class="{'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-gray-800': layout === 'vertical', 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': layout !== 'vertical'}" class="py-2 px-2 text-xs font-medium rounded-lg transition-all flex flex-col items-center gap-1">
<i class="icon-[ri--expand-vertical-line]"></i> Vertical
</button>
<button @click="layout = 'horizontal'; render()" :class="{'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-gray-800': layout === 'horizontal', 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': layout !== 'horizontal'}" class="py-2 px-2 text-xs font-medium rounded-lg transition-all flex flex-col items-center gap-1">
<i class="icon-[ri--expand-horizontal-line]"></i> Horizontal
</button>
<button @click="layout = 'grid'; render()" :class="{'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-gray-800': layout === 'grid', 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': layout !== 'grid'}" class="py-2 px-2 text-xs font-medium rounded-lg transition-all flex flex-col items-center gap-1">
<i class="icon-[ri--layout-grid-line]"></i> Grid
</button>
</div>
</div>

<!-- Columns Slider (Only for Grid) -->
<div x-show="layout === 'grid'" x-transition class="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex justify-between"><span>Columns</span> <span x-text="columns"></span></label>
<input type="range" min="2" max="6" x-model.number="columns" @input="render()" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600">
</div>

<!-- Spacing Controls -->
<div class="grid grid-cols-2 gap-4">
<div>
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Gap (px)</label>
<input type="number" x-model.number="gap" @input="render()" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors text-sm">
</div>
<div>
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Padding (px)</label>
<input type="number" x-model.number="padding" @input="render()" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors text-sm">
</div>
</div>

<!-- Radius -->
<div>
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Image Radius (px)</label>
<input type="number" x-model.number="borderRadius" @input="render()" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors text-sm">
</div>

<!-- Scale -->
<div>
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex justify-between"><span>Output Scale</span> <span x-text="scale.toFixed(1) + 'x'"></span></label>
<input type="range" min="0.1" max="2" step="0.1" x-model.number="scale" @input="render()" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600">
</div>

<!-- Background Color -->
<div>
<label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Background Color</label>
<div class="flex gap-2 items-center">
<div class="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
<input type="color" x-model="bgColor" @input="render()" class="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0" title="Choose color">
</div>
<input type="text" x-model="bgColor" @input="render()" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase w-full">
</div>
</div>

<!-- Download Button (Moved Here) -->
<div class="pt-2 border-t border-gray-100 dark:border-gray-700">
<button @click="download()" :disabled="images.length === 0" class="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2">
<i class="icon-[ri--download-2-line]"></i> Download Image
</button>
</div>
</div>
</div>

<!-- Preview Area -->
<div class="lg:col-span-8 xl:col-span-9 relative">
<div class="bg-gray-100 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 overflow-auto min-h-[600px] relative text-center">

<!-- DOM Preview (Sortable) -->
<div id="previewList" x-show="images.length > 0" 
class="transition-all duration-300 shadow-2xl mx-auto max-w-full"
:class="{'inline-flex flex-col items-center': layout === 'vertical', 'inline-flex flex-row items-center': layout === 'horizontal', 'inline-grid items-start': layout === 'grid'}"
:style="{ gap: gap + 'px', padding: padding + 'px', backgroundColor: bgColor, gridTemplateColumns: layout === 'grid' ? 'repeat(' + columns + ', minmax(0, 1fr))' : 'none' }">

<template x-for="(img, index) in images" :key="img.id">
<div class="relative group cursor-move flex justify-center" :style="{ width: layout === 'grid' ? '100%' : 'auto' }">
<img :src="img.src" class="block h-auto pointer-events-none" :class="layout === 'grid' ? 'w-full' : 'max-w-full'" :style="{ borderRadius: borderRadius + 'px' }">
<button @click="removeImage(index)" class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-sm z-10" title="Remove">
<i class="icon-[ri--close-line]"></i>
</button>
</div>
</template>
</div>

<!-- Hidden Canvas for Generation -->
<canvas x-ref="canvas" class="hidden"></canvas>

<div x-show="images.length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
<div class="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
<i class="icon-[ri--layout-masonry-line] text-4xl opacity-50"></i>
</div>
<p class="font-medium">Preview will appear here</p>
<p class="text-sm opacity-75 mt-1">Please upload images first</p>
</div>
</div>
</div>

</div>
</div>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('imageMerger', () => ({
        images: [],
        layout: 'vertical', // vertical | horizontal | grid
        scale: 1,
        columns: 2,
        gap: 20,
        padding: 40,
        borderRadius: 0,
        bgColor: '#ffffff',
        
        init() {
            // Initialize SortableJS
            const el = document.getElementById('previewList');
            if (el) {
                new Sortable(el, {
                    animation: 150,
                    draggable: '.group',
                    ghostClass: 'opacity-50',
                    onEnd: (evt) => {
                        const item = this.images.splice(evt.oldIndex, 1)[0];
                        this.images.splice(evt.newIndex, 0, item);
                        this.render();
                    }
                });
            }
        },

        handleFiles(e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            let loadedCount = 0;
            
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        this.images.push({
                            id: Date.now() + Math.random(),
                            src: event.target.result,
                            element: img,
                            name: file.name,
                            size: file.size,
                            width: img.width,
                            height: img.height
                        });
                        loadedCount++;
                        if (loadedCount === files.length) {
                            this.render();
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
            
            e.target.value = '';
        },

        removeImage(index) {
            this.images.splice(index, 1);
            this.render();
        },

        render() {
            const canvas = this.$refs.canvas;
            if (this.images.length === 0) {
                canvas.width = 0;
                canvas.height = 0;
                return;
            }

            const ctx = canvas.getContext('2d');
            
            let totalWidth = 0;
            let totalHeight = 0;
            
            // Calculate Dimensions based on Layout
            if (this.layout === 'vertical') {
                const maxImgWidth = Math.max(...this.images.map(i => i.width));
                totalWidth = maxImgWidth + (this.padding * 2);
                
                const sumHeight = this.images.reduce((acc, curr) => acc + curr.height, 0);
                const totalGap = Math.max(0, (this.images.length - 1) * this.gap);
                totalHeight = sumHeight + totalGap + (this.padding * 2);

            } else if (this.layout === 'horizontal') {
                const maxImgHeight = Math.max(...this.images.map(i => i.height));
                totalHeight = maxImgHeight + (this.padding * 2);
                
                const sumWidth = this.images.reduce((acc, curr) => acc + curr.width, 0);
                const totalGap = Math.max(0, (this.images.length - 1) * this.gap);
                totalWidth = sumWidth + totalGap + (this.padding * 2);

            } else if (this.layout === 'grid') {
                // Standard Grid Logic (Row-Major) to match DOM Preview
                const maxImgWidth = Math.max(...this.images.map(i => i.width));
                const colWidth = maxImgWidth; 
                
                totalWidth = (colWidth * this.columns) + ((this.columns - 1) * this.gap) + (this.padding * 2);
                
                // Calculate total height based on rows
                const rows = Math.ceil(this.images.length / this.columns);
                let rowHeights = [];
                
                for (let r = 0; r < rows; r++) {
                    let maxH = 0;
                    for (let c = 0; c < this.columns; c++) {
                        const idx = r * this.columns + c;
                        if (idx < this.images.length) {
                            const img = this.images[idx];
                            const scale = colWidth / img.width;
                            const h = img.height * scale;
                            if (h > maxH) maxH = h;
                        }
                    }
                    rowHeights.push(maxH);
                }

                const totalRowHeights = rowHeights.reduce((a, b) => a + b, 0);
                const totalRowGaps = Math.max(0, (rows - 1) * this.gap);
                totalHeight = totalRowHeights + totalRowGaps + (this.padding * 2);
                if (totalHeight < this.padding * 2) totalHeight = this.padding * 2;
            }

            canvas.width = totalWidth * this.scale;
            canvas.height = totalHeight * this.scale;

            // Apply Scale
            ctx.scale(this.scale, this.scale);

            // Background
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, totalWidth, totalHeight);

            // Draw Images
            if (this.layout === 'grid') {
                const maxImgWidth = Math.max(...this.images.map(i => i.width));
                const colWidth = maxImgWidth;
                
                let currentY = this.padding;
                let rowHeights = []; // Recalculate or store from above
                
                // We need row heights again to draw correctly
                const rows = Math.ceil(this.images.length / this.columns);
                for (let r = 0; r < rows; r++) {
                    let maxH = 0;
                    // First pass: find max height of this row
                    for (let c = 0; c < this.columns; c++) {
                        const idx = r * this.columns + c;
                        if (idx < this.images.length) {
                            const img = this.images[idx];
                            const scale = colWidth / img.width;
                            const h = img.height * scale;
                            if (h > maxH) maxH = h;
                        }
                    }
                    
                    // Second pass: draw items in this row
                    for (let c = 0; c < this.columns; c++) {
                        const idx = r * this.columns + c;
                        if (idx < this.images.length) {
                            const img = this.images[idx];
                            const scale = colWidth / img.width;
                            const h = img.height * scale;
                            
                            const drawX = this.padding + (c * (colWidth + this.gap));
                            // Align top? or Center in row? Usually top for grid.
                            this.drawImage(ctx, img.element, drawX, currentY, colWidth, h);
                        }
                    }
                    currentY += maxH + this.gap;
                }

            } else {
                let currentX = this.padding;
                let currentY = this.padding;

            this.images.forEach((imgData) => {
                    let drawX = currentX;
                    let drawY = currentY;

                    if (this.layout === 'vertical') {
                        // Center horizontally
                        drawX = this.padding + (totalWidth - (this.padding * 2) - imgData.width) / 2;
                    } else {
                        // Center vertically
                        drawY = this.padding + (totalHeight - (this.padding * 2) - imgData.height) / 2;
                    }

                    this.drawImage(ctx, imgData.element, drawX, drawY, imgData.width, imgData.height);

                    if (this.layout === 'vertical') {
                        currentY += imgData.height + this.gap;
                    } else {
                        currentX += imgData.width + this.gap;
                    }
                });
            }
        },

        drawImage(ctx, img, x, y, w, h) {
            if (this.borderRadius > 0) {
                ctx.save();
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x, y, w, h, this.borderRadius);
                } else {
                    ctx.rect(x, y, w, h);
                }
                ctx.clip();
                ctx.drawImage(img, x, y, w, h);
                ctx.restore();
            } else {
                ctx.drawImage(img, x, y, w, h);
            }
        },

        download() {
            const canvas = this.$refs.canvas;
            const link = document.createElement('a');
            link.download = 'merged-image-' + Date.now() + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        },

        formatSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }));
});
</script>