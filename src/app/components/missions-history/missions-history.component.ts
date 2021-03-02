import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { relativeTime } from 'human-date';
import { Mission, Vec2 } from 'src/app/models/mission';

interface ModifiedMissionStatus {
  blinking: boolean;
  label: string;
  color: string;
}

interface ModifiedMissionPoints {
  color: string;
  value: Vec2;
}

interface ModifiedMissionShape {
  dPath: string;
  closed: boolean;
}

interface ModifiedMission {
  id: string;
  date: string;
  type: string;
  status: ModifiedMissionStatus;
  drones: {
    name: string;
    color: string;
  }[];
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
      const colorMap = new Map(mission.drones.map((d) => [d.name, d.color]));
      const previousMission = ((changes.missions
        .previousValue as Mission[]) || []).find((m) => m.id === mission.id);
      const previousModifiedMission = this.missionsModified.find(
        (m) => m.id === mission.id
      );
      if (!previousMission || !previousModifiedMission) {
        const modifiedMission: ModifiedMission = {
          id: mission.id,
          date: relativeTime(new Date(mission.timestamp * 1000)),
          type: this.getMissionType(mission),
          status: this.getMissionStatus(mission),
          drones: mission.drones,
          shapes: this.getMissionShapes(mission),
          points: this.getMissionPoints(mission, colorMap),
          isExpanded: this.expandByDefault,
        };
        newMissionsModified.push(modifiedMission);
      } else {
        const attrChanged = (attrName: string) =>
          JSON.stringify(previousMission[attrName]) !==
          JSON.stringify(mission[attrName]);
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
            ? mission.drones
            : previousModifiedMission.drones,
          shapes: attrChanged('shapes')
            ? this.getMissionShapes(mission)
            : previousModifiedMission.shapes,
          points: attrChanged('points')
            ? this.getMissionPoints(mission, colorMap)
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
      case 'in_progress':
        return { blinking: true, color: 'green', label: 'In progress' };
      case 'requested':
        return { blinking: true, color: 'skyblue', label: 'Requested' };
    }
  }

  getMissionShapes(mission: Mission): ModifiedMissionShape[] {
    const stringifyShape = (shapes: Vec2[]): string =>
      shapes.reduce(
        (acc: string, cur: Vec2) => `${acc} L${cur.x} ${cur.y}`,
        ''
      );
    const isClosed = (shape: Vec2[]) => shape[0].x === shape[shape.length - 1].x && shape[0].y === shape[shape.length - 1].y;
    return mission.shapes.map(
      (s) => ({dPath: `M${s[0].x} ${s[0].y}${stringifyShape(s.slice(1))}`, closed: isClosed(s)})
    );
  }

  getMissionPoints(
    mission: Mission,
    colorMap: Map<string, string>
  ): ModifiedMissionPoints[] {
    return mission.points.map((p) => ({
      value: p.value,
      color: colorMap.get(p.droneName) as string,
    }));
  }

  onExpand(mission: ModifiedMission, tableRow: HTMLElement): void {
    if (mission.status.label === 'Requested') {
      return ;
    }
    if (this.latestExpandedMission && this.latestExpandedMission.id === mission.id) {
      mission.isExpanded = !mission.isExpanded;
      this.latestExpandedMission = mission;
      return ;
    }
    if (this.latestExpandedMission) {
      this.latestExpandedMission.isExpanded = false;
    }
    this.latestExpandedMission = mission;
    this.latestExpandedMission.isExpanded = true;
  }

  updateAllDates(): void {
    for(const modifiedMission of this.missionsModified) {
      const mission = this.missions.find(m => m.id === modifiedMission.id);
      modifiedMission.date = relativeTime(new Date(mission.timestamp * 1000));
    }
  }
}
