import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { relativeTime } from 'human-date';
import { Mission, Vec2 } from 'src/app/models/mission';

interface ModifiedMissionStatus {
  blinking: boolean;
  label: string;
  color: string;
}

interface ModifiedMissionDrone {
  name: string;
  color: string;
}

interface ModifiedMissionDronePosition {
  color: string;
  pos: Vec2;
}

interface ModifiedMissionDronePath {
  color: string;
  dPath: string;
}

interface ModifiedMissionShape {
  dPath: string;
  closed: boolean;
}

interface ModifiedMissionPoints {
  color: string;
  value: Vec2;
}

interface ModifiedMission {
  id: string;
  date: string;
  type: string;
  status: ModifiedMissionStatus;
  drones: ModifiedMissionDrone[];
  dronesPositions: ModifiedMissionDronePosition[];
  dronesPaths: ModifiedMissionDronePath[];
  shapes: ModifiedMissionShape[];
  points: ModifiedMissionPoints[];
  isExpanded: boolean;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'missions-history',
  templateUrl: './missions-history.component.html',
  styleUrls: ['./missions-history.component.scss'],
})
export class MissionsHistoryComponent implements OnChanges, AfterViewInit {
  @Input() missions: Mission[] = [];
  @Input() expandByDefault = false;
  missionsModified: ModifiedMission[] = [];
  latestExpandedMission: ModifiedMission;

  ngAfterViewInit(): void {
    setInterval(() => {
      this.updateAllDates();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.missions) {
      return;
    }
    const newMissionsModified: ModifiedMission[] = [];
    for (const mission of changes.missions.currentValue as Mission[]) {
      const previousMission = (
        (changes.missions.previousValue as Mission[]) || []
      ).find((m) => m.id === mission.id);
      const previousModifiedMission = this.missionsModified.find(
        (m) => m.id === mission.id
      );
      if (!previousMission || !previousModifiedMission) {
        const modifiedMission: ModifiedMission = {
          id: mission.id,
          date: relativeTime(new Date(mission.timestamp * 1000)),
          type: this.getMissionType(mission),
          status: this.getMissionStatus(mission),
          drones: this.getMissionDrones(mission),
          dronesPositions: this.getMissionDronesPositions(mission),
          dronesPaths: this.getMissionDronesPaths(mission),
          shapes: this.getMissionShapes(mission),
          points: this.getMissionPoints(mission),
          isExpanded: this.expandByDefault,
        };
        newMissionsModified.push(modifiedMission);
      } else {
        const attrChanged = (attrName: string) =>
          previousMission[attrName] !== mission[attrName];
        const modifiedMission: ModifiedMission = {
          id: mission.id,
          date: relativeTime(new Date(mission.timestamp * 1000)),
          type: attrChanged('type')
            ? this.getMissionType(mission)
            : previousModifiedMission.type,
          status: attrChanged('status')
            ? this.getMissionStatus(mission)
            : previousModifiedMission.status,
          drones: attrChanged('drones')
            ? this.getMissionDrones(mission)
            : previousModifiedMission.drones,
          dronesPositions: attrChanged('dronesPositions')
            ? this.getMissionDronesPositions(mission)
            : previousModifiedMission.dronesPositions,
          dronesPaths: attrChanged('dronesPaths')
            ? this.getMissionDronesPaths(mission)
            : previousModifiedMission.dronesPaths,
          shapes: attrChanged('shapes')
            ? this.getMissionShapes(mission)
            : previousModifiedMission.shapes,
          points: attrChanged('points')
            ? this.getMissionPoints(mission)
            : previousModifiedMission.points,
          isExpanded: previousModifiedMission.isExpanded,
        };
        newMissionsModified.push(modifiedMission);
      }
    }
    this.missionsModified = newMissionsModified;
  }

  getMissionType(mission: Mission): string {
    switch (mission.type) {
      case 'argos':
        return 'Argos Simulation';
      case 'crazyradio':
        return 'Crazyradio Simulation';
      case 'fake':
        return 'Fake Mission';
    }
  }

  getMissionStatus(mission: Mission): ModifiedMissionStatus {
    switch (mission.status) {
      case 'done':
        return { blinking: false, color: 'green', label: 'Done' };
      case 'failed':
        return { blinking: false, color: 'red', label: 'Failed' };
      case 'inProgress':
        return { blinking: true, color: 'green', label: 'In progress' };
      case 'requested':
        return { blinking: true, color: 'skyblue', label: 'Requested' };
      case 'rejected':
        return { blinking: false, color: 'red', label: 'Rejected' };
    }
  }

  getMissionDrones(mission: Mission): ModifiedMissionDrone[] {
    const result: ModifiedMissionDrone[] = [];
    for (const key in mission.drones) {
      if (Object.prototype.hasOwnProperty.call(mission.drones, key)) {
        result.push({ name: key, color: mission.drones[key] });
      }
    }
    return result;
  }

  getMissionDronesPositions(mission: Mission): ModifiedMissionDronePosition[] {
    const result: ModifiedMissionDronePosition[] = [];
    for (const key in mission.dronesPositions) {
      if (Object.prototype.hasOwnProperty.call(mission.dronesPositions, key)) {
        result.push({
          color: mission.drones[key],
          pos: mission.dronesPositions[key],
        });
      }
    }
    return result;
  }

  getMissionDronesPaths(mission: Mission): ModifiedMissionDronePath[] {
    const result: ModifiedMissionDronePath[] = [];
    for (const key in mission.dronesPaths) {
      if (Object.prototype.hasOwnProperty.call(mission.dronesPaths, key)) {
        result.push({
          color: mission.drones[key],
          dPath: this.getDPath(mission.dronesPaths[key]),
        });
      }
    }
    return result;
  }

  getMissionShapes(mission: Mission): ModifiedMissionShape[] {
    const isClosed = (shape: Vec2[]) =>
      shape.length > 2 &&
      shape[0].x === shape[shape.length - 1].x &&
      shape[0].y === shape[shape.length - 1].y;
    return mission.shapes.map((s) => ({
      dPath: this.getDPath(s),
      closed: isClosed(s),
    }));
  }

  getDPath(path: Vec2[]): string {
    if (path.length < 2) {
      return '';
    }
    const stringifyShape = (shapes: Vec2[]): string =>
      shapes.reduce(
        (acc: string, cur: Vec2) => `${acc} L${cur.x} ${cur.y}`,
        ''
      );
    return `M${path[0].x} ${path[0].y}${stringifyShape(path.slice(1))}`;
  }

  getMissionPoints(mission: Mission): ModifiedMissionPoints[] {
    return mission.points.map((p) => ({
      value: p.value,
      color: mission.drones[p.droneName],
    }));
  }

  onExpand(mission: ModifiedMission, tableRow: HTMLElement): void {
    if (['Requested', 'Rejected'].includes(mission.status.label)) {
      return;
    }
    if (
      this.latestExpandedMission &&
      this.latestExpandedMission.id === mission.id
    ) {
      mission.isExpanded = !mission.isExpanded;
      this.latestExpandedMission = mission;
      return;
    }
    if (this.latestExpandedMission) {
      this.latestExpandedMission.isExpanded = false;
    }
    this.latestExpandedMission = mission;
    this.latestExpandedMission.isExpanded = true;
  }

  updateAllDates(): void {
    for (const modifiedMission of this.missionsModified) {
      const mission = this.missions.find((m) => m.id === modifiedMission.id);
      modifiedMission.date = relativeTime(new Date(mission.timestamp * 1000));
    }
  }
}
