import moment from "moment";

export const formatChatDate = (date: Date) => {
    const messageDate = moment(date);
    const now = moment();

    if (messageDate.isSame(now, "day")) {
        return "Сегодня";
    } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
        return "Вчера";
    } else {
        return messageDate.format("D MMMM YYYY");
    }
};
