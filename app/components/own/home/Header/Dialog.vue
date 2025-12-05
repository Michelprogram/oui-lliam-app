<script lang="ts" setup>
import { History } from "lucide-vue-next";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

</script>

<template>
    <Dialog>
        <DialogTrigger>
            <Button size="sm" class="cursor-pointer" variant="outline">
                History
                <History />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <Command>
                <CommandInput placeholder="Type a keyword for search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandSeparator />
                    <CommandGroup heading="History">
                        <CommandItem value="for">for</CommandItem>
                        <CommandItem value="league">league</CommandItem>
                        <CommandItem value="wave">wave</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </DialogContent>
    </Dialog>
</template>
