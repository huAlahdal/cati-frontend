export class Calls {
                callId: number;
                participant: {
                id: number
                mobile: string
                numberOfCalls: number
                isFree: boolean
                isActive: boolean
                createdAt: string
                updatedAt: string
                link: string
                name: number
                age: number
                projectId: number
                statusId: number
                ageRangeId: number
                nationalityId: number
                genderId: number
                agentId: number
                cityId: number};

                todayCallsDetails: {
                id: number
                all: number
                successful: number
                timeSpent: number
                };

                lastFewCalls: [{
                id: number
                statusId: number
                phone: string;
                }];

                link: string;

    constructor() {
    }

}
