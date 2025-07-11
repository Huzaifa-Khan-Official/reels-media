import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface ISubscription {
    channelId: mongoose.Types.ObjectId
    subscriberId: mongoose.Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

const subscriptionSchema = new Schema<ISubscription>({
    channelId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    subscriberId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    }
}, { timestamps: true });

const Subscription = models?.Subscription || model<ISubscription>("Subscription", subscriptionSchema);

export default Subscription;