<script setup lang="ts">
import { useTemplateRef, Ref, ref } from "vue";
import * as balatro from "../balatrolib.ts";
import * as utils from "../utils.ts";
let hand_levels: Record<balatro.HandName, number> = {
    "high_card": 0,
    "pair": 0,
    "two_pair": 0,
    "three_of_a_kind": 0,
    "straight": 0,
    "flush": 0,
    "full_house": 0,
    "four_of_a_kind": 0,
    "straight_flush": 0,
}
let hand_keys: Record<balatro.HandName, Ref<string>> = {
    "high_card": ref<string>("high_card"),
    "pair": ref<string>("pair"),
    "two_pair": ref<string>("two_pair"),
    "three_of_a_kind": ref<string>("three_of_a_kind"),
    "straight": ref<string>("straight"),
    "flush": ref<string>("flush"),
    "full_house": ref<string>("full_house"),
    "four_of_a_kind": ref<string>("four_of_a_kind"),
    "straight_flush": ref<string>("straight_flush"),
}
let key_count = 1; // for reloading

const held_in_hand_bonus_input_ref = useTemplateRef<HTMLInputElement>("held_in_hand_bonus_input_ref");
const card_bonus_input_ref = useTemplateRef<HTMLInputElement>("card_bonus_input_ref");
const joker_bonus_input_ref = useTemplateRef<HTMLInputElement>("joker_bonus_input_ref");
function get_hand_value(hand_name: balatro.HandName) {
    const level = hand_levels[hand_name];
    return balatro.calculate_total(hand_name, level, held_in_hand_bonus_input_ref.value, joker_bonus_input_ref.value, card_bonus_input_ref.value)
}

function format_hand_name(name: string): string {
    const hand_name = name as balatro.HandName;
    return utils.titleCase(hand_name.replaceAll("_", " ")) + ` (lvl ${hand_levels[hand_name]})`;
}

function renew_hand_names() {
    Object.keys(balatro.hands).forEach(name => {
        const hand_name = name as balatro.HandName;
        hand_keys[hand_name].value = get_hand_key(hand_name);
    });
}

function get_hand_key(name: balatro.HandName): string {
    let key_suffix: string = key_count.toString();
    key_count += 1;
    return name.toString() + key_suffix;
}
function level_up(name: balatro.HandName): void {
    hand_levels[name] += 1;
    if (hand_levels[name] < 0) {
        hand_levels[name] = 0;
    }
    renew_hand_names();
}
function level_down(name: balatro.HandName): void {
    hand_levels[name] -= 1;
    if (hand_levels[name] < 0) {
        hand_levels[name] = 0;
    }
    renew_hand_names();
}
renew_hand_names();
</script>

<template>
    <h2>Balatro Poker hand calculator</h2>
    <p>Use "+" for adding and "*" for multiplying, with "c" for chips and "m" for mult, separated by commas.</p>
    <p>Example "bonus" format: +10c,+5m,*2c (meaning +10 chips, +5 mult, x2 chips)</p><br>
    <!-- <label for="cards_input">Cards:</label><br>
    <input name="cards_input" id="cards_input" placeholder="A,K,Q,J,10"><br> -->
    <label for="held_in_hand_bonus_input">Held-in-hand bonuses:</label><br>
    <input name="held_in_hand_bonus_input" ref="held_in_hand_bonus_input_ref"
        placeholder="List bonuses from Steel cards, etc."><br>
    <label for="card_bonus_input">Played card bonuses:</label><br>
    <input name="card_bonus_input" ref="card_bonus_input_ref"
        placeholder="List bonuses from Glass cards, enhanced cards, etc."><br>
    <label for="joker_bonus_input">Joker bonuses:</label><br>
    <input name="joker_bonus_input" ref="joker_bonus_input_ref" placeholder="List bonuses from jokers"><br>
    <p>Total:<span id="total_num"></span></p>
    <div id="hands_div">
        <li v-for="[name, _values] in Object.entries(balatro.hands)" :key="hand_keys[name as balatro.HandName].value">
            <button @click="() => { level_up(name as balatro.HandName) }">+</button> <button
                @click="() => { level_down(name as balatro.HandName) }">-</button> {{ format_hand_name(name) }}: {{
                    get_hand_value(name as
                        balatro.HandName) }}
        </li>
    </div>
    <button @click="renew_hand_names">Update</button>
</template>

<style lang="sass">
input
    width: 400px

#hands_div
    li
        list-style-type: none

</style>
